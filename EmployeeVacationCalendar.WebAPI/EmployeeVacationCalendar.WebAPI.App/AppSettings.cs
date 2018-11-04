using EmployeeVacationCalendar.WebAPI.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App
{
    public class AppSettings : IAppSettings
    {
        private const string _masterAdminSectionName = "MasterAdmin";
        public AppSettings(IConfiguration configuration)
        {
            MasterAdminEmail = configuration.GetSection(_masterAdminSectionName)["Email"];
            MasterAdminPassword = configuration.GetSection(_masterAdminSectionName)["Password"];
        }


        public string MasterAdminEmail { get; private set; }
        public string MasterAdminPassword { get; private set; }
    }
}
