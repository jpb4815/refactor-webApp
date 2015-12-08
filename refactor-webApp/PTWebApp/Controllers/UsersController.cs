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
    [EnableCors("*", "*", "*")]
    public class UsersController : ApiController
    {
        
        private PTAContext _ctx;

        /// <summary>
        /// use DI to inject the context obj in single use scope
        /// </summary>
        /// <param name="ctx"></param>
        public UsersController(PTAContext ctx)
        {
            _ctx = ctx;
        }


        /// <summary>
        /// Get the list of users or a single user based on the query params.
        ///  GET: api/Users
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<User> GetUsers( string query = null)
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                return
                    _ctx.Users.Where(
                        u =>
                            u.FirstName.Contains(query) 
                            || u.LastName.Contains(query) 
                            || u.Id.ToString().Contains(query));
            }
            return _ctx.Users;
        }

        // GET: api/Users/5
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
        /// update User  PUT: api/Users/5
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
        /// add user  POST: api/Users
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
        /// delete user DELETE: api/Users/5
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
        /// dispose of context object
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