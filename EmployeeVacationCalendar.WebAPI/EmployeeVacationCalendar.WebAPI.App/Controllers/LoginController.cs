using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeVacationCalendar.WebAPI.App.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<Employee> _signInManager;
        public LoginController(SignInManager<Employee> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> LoginEmployee([FromBody]LoginDTO loginDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);
            if (result.Succeeded)
            {
                return Ok(new { });
            }

            return BadRequest(new { Error = "Invalid login attempt." });
        }
    }
}