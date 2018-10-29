using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.DTO
{
    public class UserInfoDTO
    {
        public string DisplayName { get; private set; }
        public EmployeeTypeEnum Type { get; private set; }

        public UserInfoDTO(string displayName, EmployeeTypeEnum type)
        {
            DisplayName = displayName;
            Type = type;
        }
    }
}
