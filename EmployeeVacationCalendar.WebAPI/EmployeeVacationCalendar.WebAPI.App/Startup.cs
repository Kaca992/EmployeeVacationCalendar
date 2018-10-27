using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                // User settings.
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);

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
