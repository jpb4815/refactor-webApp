using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DataAccessLayer.Repositories;
using PTWebApp.Models;
using DataAccessLayer.Repositories;


namespace PTWebApp.Controllers
{
    [EnableCors("*","*","*")]
    public class PatientsController : ApiController
    {
        // GET: api/Patient
        public IEnumerable<PatientModel> Get()
        {
           var patientRepository = new PatientRepository();
            return patientRepository.Retrieve();
        }

        // GET: api/Patient/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Patient
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Patient/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Patient/5
        public void Delete(int id)
        {
        }
    }
}
