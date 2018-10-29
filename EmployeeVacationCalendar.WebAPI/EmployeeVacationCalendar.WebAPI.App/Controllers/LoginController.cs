using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Common.Exceptions;
using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeVacationCalendar.WebAPI.App.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<Employee> _signInManager;
        private UserManager<Employee> _userManager;
        private EmployeeVacationDbContext _context;

        public LoginController(SignInManager<Employee> signInManager, UserManager<Employee> userManager, EmployeeVacationDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> LoginEmployee([FromBody]LoginDTO loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);
            if (result.Succeeded)
            {
                var normalizedEmail = loginDto.Email.ToUpper();
                var user = _context.Users.FirstOrDefault(x => x.NormalizedEmail == normalizedEmail);
                return Ok(new UserInfoDTO(user.DisplayName, user.EmployeeType));
            }

            return BadRequest(new UserLoginFailedException());
        }

        //[Authorize]
        //[HttpGet]
        //public async Task<IActionResult> GetLoggedEmployeeInfo()
        //{
        //    var user = await _userManager.GetUserAsync(User);    
        //}
    }
}