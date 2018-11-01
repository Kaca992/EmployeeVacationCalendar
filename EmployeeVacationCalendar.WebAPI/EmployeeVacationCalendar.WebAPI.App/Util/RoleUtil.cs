using EmployeeVacationCalendar.WebAPI.Common;
using EmployeeVacationCalendar.WebAPI.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App.Util
{
    public static class RoleUtil
    {
        public static string GetRoleFromEmployeeType(EmployeeTypeEnum employeeType)
        {
            switch(employeeType)
            {
                case EmployeeTypeEnum.User:
                    return EmployeeRoles.User;
                case EmployeeTypeEnum.Admin:
                    return EmployeeRoles.Admin;
                case EmployeeTypeEnum.MasterAdmin:
                    return EmployeeRoles.MasterAdmin;
                default:
                    return EmployeeRoles.User;
            }
        }
    }
}
