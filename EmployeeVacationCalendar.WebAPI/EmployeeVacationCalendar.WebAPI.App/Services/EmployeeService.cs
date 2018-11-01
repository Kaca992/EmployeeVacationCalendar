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

        public async Task<UserInfoDTO> AddUpdateUserInfo(string loggedUserId, EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            Employee employee = newUserInfoDTO.IsNewUser ? await addNewUserInfo(loggedUserType, newUserInfoDTO) : await updateUserInfo(loggedUserId, loggedUserType, newUserInfoDTO);
            return DtoMapper.MapEmployeeToDTO(employee);
        }

        private async Task<Employee> updateUserInfo(string loggedUserId, EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            if (newUserInfoDTO.Id != loggedUserId && loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            // TODO provjeriti kaj se desi ak ne postoji user
            var oldUserInfo = await _context.Users.FindAsync(loggedUserId);

            if (oldUserInfo.ConcurrencyStamp != newUserInfoDTO.ConcurrencyStamp) throw new ValuesChangedByAnotherUserException();
            oldUserInfo.FirstName = newUserInfoDTO.FirstName;
            oldUserInfo.LastName = newUserInfoDTO.LastName;
            oldUserInfo.Email = newUserInfoDTO.Email;

            if (!string.IsNullOrEmpty(newUserInfoDTO.NewPassword))
            {
                oldUserInfo.PasswordHash = _userManager.PasswordHasher.HashPassword(oldUserInfo, newUserInfoDTO.NewPassword);
            }

            IdentityResult result = await _userManager.UpdateAsync(oldUserInfo);

            if (result.Succeeded)
            {
                return oldUserInfo;
            }

            return oldUserInfo;
        }

        private async Task<Employee> addNewUserInfo(EmployeeTypeEnum loggedUserType, NewUserInfoDTO newUserInfoDTO)
        {
            if (loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            var newEmployeeInfo = new Employee
            {
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

            return newEmployeeInfo;
        }
    }
}
