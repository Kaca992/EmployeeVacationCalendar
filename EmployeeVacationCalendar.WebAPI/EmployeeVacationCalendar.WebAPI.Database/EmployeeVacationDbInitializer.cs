using EmployeeVacationCalendar.WebAPI.Common;
using EmployeeVacationCalendar.WebAPI.Common.Enums;
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
            seedMasterAdmin(appSettings, userManager);
#if DEBUG
            seedTestUsers(appSettings, userManager);
#endif
        }

        private static void seedTestUsers(IAppSettings appSettings, UserManager<Employee> userManager)
        {
            seedUser(appSettings, userManager, new Employee { UserName = "test1@test.com", Email = "test1@test.com", FirstName = "Test", LastName = "User 1", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test2@test.com", Email = "test2@test.com", FirstName = "Test", LastName = "User 2", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test3@test.com", Email = "test3@test.com", FirstName = "Test", LastName = "User 3", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "admin1@test.com", Email = "admin1@test.com", FirstName = "Admin", LastName = "User 9", EmployeeType = EmployeeTypeEnum.Admin });
            seedUser(appSettings, userManager, new Employee { UserName = "test4@test.com", Email = "test4@test.com", FirstName = "Test", LastName = "User 4", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test5@test.com", Email = "test5@test.com", FirstName = "Test", LastName = "User 5", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test6@test.com", Email = "test6@test.com", FirstName = "Test", LastName = "User 6", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test7@test.com", Email = "test7@test.com", FirstName = "Test", LastName = "User 7", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "test8@test.com", Email = "test8@test.com", FirstName = "Test", LastName = "User 8", EmployeeType = EmployeeTypeEnum.User });
            seedUser(appSettings, userManager, new Employee { UserName = "admin2@test.com", Email = "admin2@test.com", FirstName = "Admin", LastName = "User 10", EmployeeType = EmployeeTypeEnum.Admin });
        }

        private static void seedMasterAdmin(IAppSettings appSettings, UserManager<Employee> userManager)
        {
            if (userManager.FindByEmailAsync(appSettings.MasterAdminEmail).Result == null)
            {
                Employee user = new Employee
                {
                    UserName = appSettings.MasterAdminEmail,
                    Email = appSettings.MasterAdminEmail,
                    EmployeeType = EmployeeTypeEnum.MasterAdmin,
                    FirstName = "MOD",
                    LastName = "Admin"
                };

                IdentityResult result = userManager.CreateAsync(user, appSettings.MasterAdminPassword).Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, EmployeeRoles.MasterAdmin).Wait();
                }
            }
        }

        private static void seedUser(IAppSettings appSettings, UserManager<Employee> userManager, Employee newUser, string role = EmployeeRoles.User)
        {
            if (userManager.FindByEmailAsync(newUser.Email).Result == null)
            {
                IdentityResult result = userManager.CreateAsync(newUser, appSettings.MasterAdminPassword).Result;
                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(newUser, role).Wait();
                }
            }
        }
    }
}
