using EmployeeVacationCalendar.WebAPI.Common;
using EmployeeVacationCalendar.WebAPI.Common.Interfaces;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeVacationCalendar.WebAPI.Database
{
    public static class EmployeeVacationDbInitializer
    {
        /// <summary>
        /// Seeds default roles into the database
        /// </summary>
        /// <param name="builder"></param>
        public static void SeedDefaultRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = EmployeeRoles.MasterAdmin, NormalizedName = EmployeeRoles.MasterAdmin.ToUpper() });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = EmployeeRoles.Admin, NormalizedName = EmployeeRoles.Admin.ToUpper() });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = EmployeeRoles.User, NormalizedName = EmployeeRoles.User.ToUpper() });
        }

        public static void SeedUsers(IAppSettings appSettings, UserManager<Employee> userManager)
        {
            if (userManager.FindByEmailAsync(appSettings.MasterAdminEmail).Result == null)
            {
                Employee user = new Employee
                {
                    UserName = appSettings.MasterAdminEmail,
                    Email = appSettings.MasterAdminEmail
                };

                IdentityResult result = userManager.CreateAsync(user, appSettings.MasterAdminPassword).Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, EmployeeRoles.MasterAdmin).Wait();
                }
            }
        }
    }
}
