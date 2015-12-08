using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using DataAccess.DataModels;
using PTWebApp.DataContext;

namespace PTWebApp.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ExcerciseListsController : ApiController
    {
        private PTAContext _ctx;

        public ExcerciseListsController(PTAContext ctx)
        {
            _ctx = ctx;
        }

        // GET: api/ExcerciseLists
        public IQueryable<ExcerciseList> GetExcerciseList()
        {
            return _ctx.ExcerciseList;
        }

        // GET: api/ExcerciseLists/5
        [ResponseType(typeof(ExcerciseList))]
        public async Task<IHttpActionResult> GetExcerciseList(int id)
        {
            ExcerciseList excerciseList = await _ctx.ExcerciseList.FindAsync(id);
            if (excerciseList == null)
            {
                return NotFound();
            }

            return Ok(excerciseList);
        }

        // PUT: api/ExcerciseLists/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutExcerciseList(int id, ExcerciseList excerciseList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != excerciseList.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(excerciseList).State = EntityState.Modified;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExcerciseListExists(id))
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

        // POST: api/ExcerciseLists
        [ResponseType(typeof(ExcerciseList))]
        public async Task<IHttpActionResult> PostExcerciseList(ExcerciseList excerciseList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.ExcerciseList.Add(excerciseList);
            await _ctx.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = excerciseList.Id }, excerciseList);
        }

        // DELETE: api/ExcerciseLists/5
        [ResponseType(typeof(ExcerciseList))]
        public async Task<IHttpActionResult> DeleteExcerciseList(int id)
        {
            ExcerciseList excerciseList = await _ctx.ExcerciseList.FindAsync(id);
            if (excerciseList == null)
            {
                return NotFound();
            }

            _ctx.ExcerciseList.Remove(excerciseList);
            await _ctx.SaveChangesAsync();

            return Ok(excerciseList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _ctx.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExcerciseListExists(int id)
        {
            return _ctx.ExcerciseList.Count(e => e.Id == id) > 0;
        }
    }
}