using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App.Util
{
    public static class DtoMapper
    {
        public static UserInfoDTO MapEmployeeToDTO(Employee employee)
        {
            return new UserInfoDTO
            {
                Id = employee.Id,
                Email = employee.Email,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                ConcurrencyStamp = employee.ConcurrencyStamp,
                Type = employee.EmployeeType
            };
        }

        public static CalendarEntryDTO MapCalendarEntryToDTO(CalendarEntry calendarEntry)
        {
            return new CalendarEntryDTO
            {
                Id = calendarEntry.Id,
                StartDate = calendarEntry.StartDate,
                EndDate = calendarEntry.EndDate,
                EmployeeId = calendarEntry.EmployeeId,
                ConcurrencyStamp = calendarEntry.ConcurrencyStamp.ToString(),
                VacationType = calendarEntry.VacationType
            };
        }
    }
}
