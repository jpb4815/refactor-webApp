using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using PTWebApp.DataContext;
using PTWebApp.DataModels;

namespace PTWebApp.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProvidersController : ApiController
    {
        
        private PTAContext _ctx;

        /// <summary>
        /// Using DI to inject context in single use scope
        /// </summary>
        /// <param name="ctx"></param>
        public ProvidersController(PTAContext ctx)
        {
            _ctx = ctx;
        }


        /// <summary>
        /// GET: api/Providers
        /// Gets a list of providers or a single provider based on query params
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<User> GetUsers(string query = null)
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                return
                    _ctx.Users.Where(
                        x =>
                            x.UseRole == Role.Doctor & x.Id.ToString().Contains(query)|| x.FirstName.Contains(query) 
                            || x.LastName.Contains(query) || x.Location.Contains(query) ||
                            x.DeaNumber.ToString().Contains(query));
            }
            return _ctx.Users.Where(p=>p.UseRole == Role.Doctor);
        }

        // GET: api/Providers/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            User user = await _ctx.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        
        /// <summary>
        /// PUT: api/Providers/5
        /// update provider
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(user).State = EntityState.Modified;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

         
        /// <summary>
        /// POST: api/Providers
        /// Add provider 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }


        /// <summary>
        ///  DELETE: api/Providers/5
        /// delete provider
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User user = await _ctx.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _ctx.Users.Remove(user);
            await _ctx.SaveChangesAsync();

            return Ok(user);
        }

        /// <summary>
        /// Dispose of context, good housekeeping
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _ctx.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return _ctx.Users.Count(e => e.Id == id) > 0;
        }
    }
}