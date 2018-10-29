using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.Exceptions
{
    public class UserLoginFailedException: Exception
    {
        public UserLoginFailedException(): base("The email or password you entered is invalid.")
        {

        }
    }
}
