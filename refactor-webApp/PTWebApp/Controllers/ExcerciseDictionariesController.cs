﻿using System;
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
    public class ExcerciseDictionariesController : ApiController
    {
        private PTAContext _ctx;

        public ExcerciseDictionariesController(PTAContext ctx)
        {
            _ctx = ctx;
        }

        // GET: api/ExcerciseDictionaries
        public IQueryable<ExcerciseDictionary> GetExcerciseDictionaries()
        {
            return _ctx.ExcerciseDictionaries;
        }

        // GET: api/ExcerciseDictionaries/5
        [ResponseType(typeof(ExcerciseDictionary))]
        public async Task<IHttpActionResult> GetExcerciseDictionary(int id)
        {
            ExcerciseDictionary excerciseDictionary = await _ctx.ExcerciseDictionaries.FindAsync(id);
            if (excerciseDictionary == null)
            {
                return NotFound();
            }

            return Ok(excerciseDictionary);
        }

        // PUT: api/ExcerciseDictionaries/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutExcerciseDictionary(int id, ExcerciseDictionary excerciseDictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != excerciseDictionary.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(excerciseDictionary).State = EntityState.Modified;

            try
            {
                await _ctx.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExcerciseDictionaryExists(id))
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

        // POST: api/ExcerciseDictionaries
        [ResponseType(typeof(ExcerciseDictionary))]
        public async Task<IHttpActionResult> PostExcerciseDictionary(ExcerciseDictionary excerciseDictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.ExcerciseDictionaries.Add(excerciseDictionary);
            await _ctx.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = excerciseDictionary.Id }, excerciseDictionary);
        }

        // DELETE: api/ExcerciseDictionaries/5
        [ResponseType(typeof(ExcerciseDictionary))]
        public async Task<IHttpActionResult> DeleteExcerciseDictionary(int id)
        {
            ExcerciseDictionary excerciseDictionary = await _ctx.ExcerciseDictionaries.FindAsync(id);
            if (excerciseDictionary == null)
            {
                return NotFound();
            }

            _ctx.ExcerciseDictionaries.Remove(excerciseDictionary);
            await _ctx.SaveChangesAsync();

            return Ok(excerciseDictionary);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _ctx.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExcerciseDictionaryExists(int id)
        {
            return _ctx.ExcerciseDictionaries.Count(e => e.Id == id) > 0;
        }
    }
}