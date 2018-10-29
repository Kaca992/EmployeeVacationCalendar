using EmployeeVacationCalendar.WebAPI.Common.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Database.Models
{
    public class Employee: IdentityUser
    {
        [PersonalData]
        public string FirstName { get; set; }

        [PersonalData]
        public string LastName { get; set; }

        public string DisplayName => $"{LastName} {FirstName}";

        public EmployeeTypeEnum EmployeeType { get; set; }
    }
}
