using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.DTO
{
    public class DeleteUserDTO
    {
        public string Id { get; set; }
        public string ConcurrencyStamp { get; set; }
    }
}
