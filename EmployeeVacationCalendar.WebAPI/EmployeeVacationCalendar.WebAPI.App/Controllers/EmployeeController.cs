﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.App.Services;
using EmployeeVacationCalendar.WebAPI.App.Util;
using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Common.Enums;
using EmployeeVacationCalendar.WebAPI.Common.Exceptions;
using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeVacationCalendar.WebAPI.App.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private SignInManager<Employee> _signInManager;
        private UserManager<Employee> _userManager;
        private IEmployeeService _employeeService;

        public EmployeeController(SignInManager<Employee> signInManager, UserManager<Employee> userManager, IEmployeeService employeeService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _employeeService = employeeService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetLoggedEmployeeInfo()
        {
            var user = await _userManager.GetUserAsync(User);
            return Ok(DtoMapper.MapEmployeeToDTO(user));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddOrUpdateEmployeeInfo([FromBody] NewUserInfoDTO newUserInfoDTO)
        {
            var loggedUser = await _userManager.GetUserAsync(User);
            try
            {
                var userDto = await _employeeService.AddUpdateUserInfo(loggedUser.Id, loggedUser.EmployeeType, newUserInfoDTO);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException || ex is AdminRoleRequiredException || ex is ValuesChangedByAnotherUserException)
                {
                    return BadRequest(ex);
                }

                throw;
            }
        }
    }
}