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
using DataAccess.DataModels;
using PTWebApp.DataContext;

namespace PTWebApp.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ExcercisesController : ApiController
    {
        
        private PTAContext _ctx;

        public ExcercisesController(PTAContext ctx)
        {
            _ctx = ctx;
        }

        // GET: api/Excercises
        public IEnumerable<Excercise> GetExcercises(string query = null)
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                return
                    _ctx.Excercises.Where(
                        x =>
                            x.Id.ToString().Contains(query) || x.Description.Contains(query) ||
                            x.InjuryType.Contains(query) || x.Name.Contains(query) ||
                            x.Repetitions.ToString().Contains(query));
            }
            return _ctx.Excercises;
        }

        // GET: api/Excercises/5
        [ResponseType(typeof(Excercise))]
        public IHttpActionResult GetExcercise(int id)
        {
            Excercise excercise = _ctx.Excercises.Find(id);
            if (excercise == null)
            {
                return NotFound();
            }

            return Ok(excercise);
        }

        // PUT: api/Excercises/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExcercise(int id, Excercise excercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != excercise.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(excercise).State = EntityState.Modified;

            try
            {
                _ctx.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExcerciseExists(id))
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

        // POST: api/Excercises
        [ResponseType(typeof(Excercise))]
        public IHttpActionResult PostExcercise(Excercise newExcercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.Excercises.Add(newExcercise);
            _ctx.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = newExcercise.Id }, newExcercise);
        }

        // DELETE: api/Excercises/5
        [ResponseType(typeof(Excercise))]
        public IHttpActionResult DeleteExcercise(int id)
        {
            Excercise excercise = _ctx.Excercises.Find(id);
            if (excercise == null)
            {
                return NotFound();
            }

            _ctx.Excercises.Remove(excercise);
            _ctx.SaveChanges();

            return Ok(excercise);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _ctx.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExcerciseExists(int id)
        {
            return _ctx.Excercises.Count(e => e.Id == id) > 0;
        }
    }
}