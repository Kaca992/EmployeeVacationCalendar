using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Common.Interfaces
{
    public interface IAppSettings
    {
        string MasterAdminEmail { get; }
        string MasterAdminPassword { get; }
    }
}
