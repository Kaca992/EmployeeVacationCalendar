using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.DTO
{
    public class CalendarEntryDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public VacationTypeEnum VacationType { get; set; }
        public string EmployeeId { get; set; }
        public string ConcurrencyStamp { get; set; }
    }
}
