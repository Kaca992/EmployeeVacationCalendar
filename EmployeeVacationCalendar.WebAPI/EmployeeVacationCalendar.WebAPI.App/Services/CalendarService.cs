using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App.Services
{
    public interface ICalendarService
    {

    }

    public class CalendarService: ICalendarService
    {
        EmployeeVacationDbContext _context;
        UserManager<Employee> _userManager;

        public CalendarService(EmployeeVacationDbContext context, UserManager<Employee> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
    }
}
