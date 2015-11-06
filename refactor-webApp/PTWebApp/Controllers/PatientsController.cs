using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using DataAccess.Repositories;
using PTWebApp.DataModels;


namespace PTWebApp.Controllers
{
    [EnableCors("*","*","*")]
    public class PatientsController : ApiController
    {
        private IPtaRepository _repo;

        public PatientsController(IPtaRepository repo)
        {
            _repo = repo;
        }

        // GET: api/Patient
        public IEnumerable<User> Get()
        {
            return _repo.GetUsers().Where(u => u.UseRole == Role.Patient).ToList();
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
