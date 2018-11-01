using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.App.Services;
using EmployeeVacationCalendar.WebAPI.Common;
using EmployeeVacationCalendar.WebAPI.Common.Interfaces;
using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace EmployeeVacationCalendar.WebAPI.App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EmployeeVacationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("EmployeeVacationDatabase")));

            services.AddIdentity<Employee, IdentityRole>()
                .AddEntityFrameworkStores<EmployeeVacationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // User settings.
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = false;
                options.Cookie.Name = "EMPLOYEE_IDENTITY";
                options.ExpireTimeSpan = TimeSpan.FromMinutes(15);

                options.LoginPath = "/login";
                options.AccessDeniedPath = "/access-denied";
                options.SlidingExpiration = true;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAuthorization(options =>
            {
                options.AddPolicy(EmployeePolicies.RequireMasterAdminRole, policy => policy.RequireRole(EmployeeRoles.MasterAdmin));
                options.AddPolicy(EmployeePolicies.RequireAdminRights, policy => policy.RequireRole(EmployeeRoles.MasterAdmin, EmployeeRoles.Admin));
            });

            configureDI(services);
        }

        private void configureDI(IServiceCollection services)
        {
            services.AddSingleton<IAppSettings, AppSettings>();
            services.AddTransient<IEmployeeService, EmployeeService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, UserManager<Employee> userManager, IAppSettings appSettings)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthentication();

            // api routes
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //handle client side routes
            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            });

            // initialize users
            EmployeeVacationDbInitializer.SeedUsers(appSettings, userManager);
        }
    }
}
