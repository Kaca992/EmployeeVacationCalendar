using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Database.Models
{
    public class CalendarEntry
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }
        public VacationTypeEnum VacationType { get; set;}

        public string EmployeeId { get; set; }
        public Employee Employee { get; set; }

        [Timestamp]
        public byte[] ConcurrencyStamp { get; set; }
    }
}
