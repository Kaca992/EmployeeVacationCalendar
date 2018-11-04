using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.DTO
{
    public class NewUserInfoDTO: UserInfoDTO
    {
        public string NewPassword { get; set; }
        public bool IsNewUser => string.IsNullOrEmpty(Id);
    }
}
