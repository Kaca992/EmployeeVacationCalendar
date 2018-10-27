using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeVacationCalendar.WebAPI.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeVacationCalendar.WebAPI.App.Controllers
{
    [Route("api/[controller]")]
    public class CalendarController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [Authorize(Policy = EmployeePolicies.RequireMasterAdminRole)]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
