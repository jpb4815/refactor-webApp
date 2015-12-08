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
using System.Web.Http.Description;
using System.Web.WebPages;
using DataAccess.DataModels;
using PTWebApp.DataContext;

namespace PTWebApp.Controllers
{
    public class ProgramsController : ApiController
    {
        private PTAContext _ctx;

        /// <summary>
        /// Using DI to inject context into CTOR in single use scope
        /// </summary>
        /// <param name="ctx"></param>
        public ProgramsController(PTAContext ctx)
        {
            _ctx = ctx;
        }


        /// <summary>
        /// GET: api/Programs
        /// Gets a list of programs or a single program based on query params
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<Program> GetPrograms(string query = null)
        {
            if (!string.IsNullOrWhiteSpace((query)))
            {
                return _ctx.Programs.Where(p=>p.UserId.ToString() == query);
            }
            return _ctx.Programs;
        }

        // GET: api/Programs/5
        [ResponseType(typeof(Program))]
        public async Task<IHttpActionResult> GetProgram(int id)
        {
            Program program = await _ctx.Programs.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }

            return Ok(program);
        }


        /// <summary>
        /// PUT: api/Programs/5
        /// update a program
        /// </summary>
        /// <param name="id"></param>
        /// <param name="program"></param>
        /// <returns></returns>
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProgram(int id, Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != program.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(program).State = EntityState.Modified;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramExists(id))
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
        /// POST: api/Programs
        /// add a program
        /// </summary>
        /// <param name="program"></param>
        /// <returns></returns>
        [ResponseType(typeof(Program))]
        public async Task<IHttpActionResult> PostProgram(Program program)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.Programs.Add(program);
            await _ctx.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = program.Id }, program);
        }


        /// <summary>
        /// DELETE: api/Programs/5
        /// Delete a program
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(Program))]
        public async Task<IHttpActionResult> DeleteProgram(int id)
        {
            Program program = await _ctx.Programs.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }

            _ctx.Programs.Remove(program);
            await _ctx.SaveChangesAsync();

            return Ok(program);
        }

        /// <summary>
        /// Good house keeping, dispose of context
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

        private bool ProgramExists(int id)
        {
            return _ctx.Programs.Count(e => e.Id == id) > 0;
        }
    }
}