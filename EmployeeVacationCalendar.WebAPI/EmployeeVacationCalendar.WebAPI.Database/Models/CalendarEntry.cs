using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Database.Models
{
    public class CalendarEntry
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public VacationTypeEnum VacationType { get; set;}

        public Employee Employee { get; set; }
    }
}
