using EmployeeVacationCalendar.WebAPI.Common;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeVacationCalendar.WebAPI.Database
{
    public class EmployeeVacationDbContext: IdentityDbContext<Employee>
    {
        public EmployeeVacationDbContext(DbContextOptions<EmployeeVacationDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            EmployeeVacationDbInitializer.SeedDefaultRoles(builder);
        }
    }
}
