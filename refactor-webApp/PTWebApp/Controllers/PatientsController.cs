using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using PTWebApp.DataContext;
using PTWebApp.DataModels;

namespace PTWebApp.Controllers
{
    [EnableCors("*","*","*")]
    public class PatientsController : ApiController
    {
        private PTAContext _ctx;

        /// <summary>
        /// Using DI to inject context in single instance scope
        /// </summary>
        /// <param name="ctx"></param>
        public PatientsController(PTAContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// GET: api/Patients
        /// gets a list of Users whose role is patient, or gets a single patient based on query params
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
                            x.UseRole == Role.Patient & x.FirstName.Contains(query)
                            || x.LastName.Contains(query) ||x.UserName.Contains(query) ||
                            x.SocialSecurityNumber.ToString().Contains(query));
            }
            return _ctx.Users.Where(u=>u.UseRole == Role.Patient);
        }

        // GET: api/Patients/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = _ctx.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        /// <summary>
        /// PUT: api/Patients/5
        /// updates patient in db
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
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
                _ctx.SaveChanges();
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
        ///  POST: api/Patients
        /// Adds a patient to the database
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.Users.Add(user);
            _ctx.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

         
        /// <summary>
        /// DELETE: api/Patients/5
        /// deletes a patient from the database 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = _ctx.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _ctx.Users.Remove(user);
            _ctx.SaveChanges();

            return Ok(user);
        }

        /// <summary>
        /// good housekeeping to dispose of context
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