using EmployeeVacationCalendar.WebAPI.App.Util;
using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Common.Enums;
using EmployeeVacationCalendar.WebAPI.Common.Exceptions;
using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App.Services
{
    public interface IEmployeeService
    {
        Task<UserInfoDTO> AddUpdateUserInfo(string loggedUserId, EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO);
        Dictionary<string, UserInfoDTO> GetAllEmployeesGroupedById();
        Task DeleteEmployee(string loggedUserId, EmployeeTypeEnum loggedUserType, string employeeId, string employeeConcurrencyToken);
    }

    public class EmployeeService : IEmployeeService
    {
        EmployeeVacationDbContext _context;
        UserManager<Employee> _userManager;

        public EmployeeService(EmployeeVacationDbContext context, UserManager<Employee> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        #region Insert/Update user
        public async Task<UserInfoDTO> AddUpdateUserInfo(string loggedUserId, EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            Employee employee = newUserInfoDTO.IsNewUser ? await addNewUserInfo(loggedUserType, newUserInfoDTO) : await updateUserInfo(loggedUserId, loggedUserType, newUserInfoDTO);
            return DtoMapper.MapEmployeeToDTO(employee);
        }

        private async Task<Employee> updateUserInfo(string loggedUserId, EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            if (newUserInfoDTO.Id != loggedUserId && loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            var oldUserInfo = await _context.Users.FindAsync(newUserInfoDTO.Id);

            if (oldUserInfo == null)
            {
                throw new ArgumentException("User was deleted by someone else.");
            }

            if (oldUserInfo.ConcurrencyStamp != newUserInfoDTO.ConcurrencyStamp) throw new ValuesChangedByAnotherUserException();
            oldUserInfo.FirstName = newUserInfoDTO.FirstName;
            oldUserInfo.LastName = newUserInfoDTO.LastName;
            oldUserInfo.UserName = newUserInfoDTO.Email;
            oldUserInfo.Email = newUserInfoDTO.Email;

            if (!string.IsNullOrEmpty(newUserInfoDTO.NewPassword))
            {
                var passwordResult = await _userManager.PasswordValidators.FirstOrDefault().ValidateAsync(_userManager, oldUserInfo, newUserInfoDTO.NewPassword);

                if (!passwordResult.Succeeded) throw new ArgumentException(passwordResult.Errors.FirstOrDefault()?.Description);
                oldUserInfo.PasswordHash = _userManager.PasswordHasher.HashPassword(oldUserInfo, newUserInfoDTO.NewPassword);
            }

            IdentityResult result = await _userManager.UpdateAsync(oldUserInfo);

            if (result.Succeeded)
            {
                return oldUserInfo;
            } else
            {
                // this will be duplicate username in this case
                throw new ArgumentException(result.Errors.FirstOrDefault().Description);
            }
        }

        private async Task<Employee> addNewUserInfo(EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            if (loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            var newEmployeeInfo = new Employee
            {
                UserName = newUserInfoDTO.Email,
                FirstName = newUserInfoDTO.FirstName,
                LastName = newUserInfoDTO.LastName,
                Email = newUserInfoDTO.Email,
                EmployeeType = newUserInfoDTO.Type
            };

            IdentityResult result = await _userManager.CreateAsync(newEmployeeInfo, newUserInfoDTO.NewPassword);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newEmployeeInfo, RoleUtil.GetRoleFromEmployeeType(newEmployeeInfo.EmployeeType));
            }
            else
            {
                // this will be duplicate username in this case
                throw new ArgumentException(result.Errors.FirstOrDefault().Description);
            }

            return newEmployeeInfo;
        }
        #endregion

        public Dictionary<string, UserInfoDTO> GetAllEmployeesGroupedById()
        {
            return _context.Users.Select(x => DtoMapper.MapEmployeeToDTO(x)).ToDictionary(x => x.Id, x => x);
        }

        public async Task DeleteEmployee(string loggedUserId, EmployeeTypeEnum loggedUserType, string employeeId, string employeeConcurrencyToken)
        {
            if (loggedUserId == employeeId) throw new ArgumentException("Cannot delete logged user.");
            if (loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();

            var employee = await _context.Users.FindAsync(employeeId);

            if (employee == null) return;
            if (employee.EmployeeType == EmployeeTypeEnum.MasterAdmin) throw new ArgumentException("Master admin cannot be deleted.");
            if (employee.ConcurrencyStamp != employeeConcurrencyToken) throw new ValuesChangedByAnotherUserException();

            _context.Users.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}
