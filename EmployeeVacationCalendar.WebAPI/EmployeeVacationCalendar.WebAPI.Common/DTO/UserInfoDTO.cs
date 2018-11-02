using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.DTO
{
    public class UserInfoDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ConcurrencyStamp { get; set; }
        public EmployeeTypeEnum Type { get; set; }

        public string DisplayName => $"{LastName}, {FirstName}";
    }
}
