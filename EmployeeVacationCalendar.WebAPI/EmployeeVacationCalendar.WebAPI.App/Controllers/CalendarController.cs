using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.App.Services;
using EmployeeVacationCalendar.WebAPI.Common;
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
    public class CalendarController : Controller
    {
        private SignInManager<Employee> _signInManager;
        private UserManager<Employee> _userManager;
        private EmployeeVacationDbContext _context;
        private ICalendarService _calendarService;

        public CalendarController(SignInManager<Employee> signInManager, UserManager<Employee> userManager, EmployeeVacationDbContext context, ICalendarService calendarService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _calendarService = calendarService;
        }

        [HttpGet("{year}/{month}")]
        public IActionResult GetCalendarEntries(int year, int month)
        {
            var entries = _calendarService.GetCalendarEntries(year, month);
            return Ok(entries);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddOrUpdateCalendarEntries([FromBody]CalendarEntryDTO calendarEntry)
        {
            try
            {
                var loggedUser = await _userManager.GetUserAsync(User);
                var newEntry = await _calendarService.AddUpdateCalendarEntry(loggedUser.Id, loggedUser.EmployeeType, calendarEntry);
                return Ok(newEntry);
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException || ex is AdminRoleRequiredException || ex is ValuesChangedByAnotherUserException)
                {
                    return BadRequest(new Exception(ex.Message));
                }

                throw;
            }
        }

        [Authorize]
        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> DeleteCalendarEntry([FromBody]CalendarEntryDTO calendarEntry)
        {
            try
            {
                var loggedUser = await _userManager.GetUserAsync(User);
                await _calendarService.DeleteCalendarEntry(loggedUser.Id, loggedUser.EmployeeType, calendarEntry);
                return Ok(new { Id = calendarEntry.Id });
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException || ex is AdminRoleRequiredException || ex is ValuesChangedByAnotherUserException)
                {
                    return BadRequest(new Exception(ex.Message));
                }

                throw;
            }
        }
    }
}
