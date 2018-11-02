using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.Exceptions
{
    public class ValuesChangedByAnotherUserException: Exception
    {
        public ValuesChangedByAnotherUserException(): base ("Another user has changed this entry. Please refresh the page and try again.")
        {

        }
    }
}
