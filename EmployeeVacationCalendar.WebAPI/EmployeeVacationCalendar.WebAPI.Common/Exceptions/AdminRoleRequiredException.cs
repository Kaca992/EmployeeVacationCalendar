using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.Exceptions
{
    public class AdminRoleRequiredException: Exception
    {
        public AdminRoleRequiredException(): base("Insufficient permissions. Admin role required to perform this action")
        {

        }
    }
}
