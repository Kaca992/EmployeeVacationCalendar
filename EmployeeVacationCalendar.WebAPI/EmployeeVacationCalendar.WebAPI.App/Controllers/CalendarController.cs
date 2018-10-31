using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.Common;
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

        public CalendarController(SignInManager<Employee> signInManager, UserManager<Employee> userManager, EmployeeVacationDbContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
        }

        [Authorize]
        [HttpGet("{year}/{month}")]
        public IEnumerable<string> GetCalendarEntries(int year, int month)
        {
            var authUser = HttpContext.User;
            var user = _userManager.GetUserAsync(User).Result;
            return new string[] { "value1", "value2" };
        }
    }
}
