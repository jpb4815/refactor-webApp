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
    public class InjuryDictionariesController : ApiController
    {
        
        private PTAContext _ctx;

        public InjuryDictionariesController(PTAContext ctx)
        {
            _ctx = ctx;
        }

        // GET: api/InjuryDictionaries
        public IQueryable<InjuryDictionary> GetInjuryDictionaries(string query = null)
        {
            if (!string.IsNullOrWhiteSpace(query))
            {
                //search fields here
                return
                    _ctx.InjuryDictionaries.Where(id => id.Id.ToString().Contains(query) || id.Description.Contains(query) || id.Injury.Contains(query));
            }
            return _ctx.InjuryDictionaries;
        }

        // GET: api/InjuryDictionaries/5
        [ResponseType(typeof(InjuryDictionary))]
        public IHttpActionResult GetInjuryDictionary(int id)
        {
            InjuryDictionary injuryDictionary = _ctx.InjuryDictionaries.Find(id);
            if (injuryDictionary == null)
            {
                return NotFound();
            }

            return Ok(injuryDictionary);
        }

        // PUT: api/InjuryDictionaries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInjuryDictionary(int id, InjuryDictionary injuryDictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != injuryDictionary.Id)
            {
                return BadRequest();
            }

            _ctx.Entry(injuryDictionary).State = EntityState.Modified;

            try
            {
                _ctx.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InjuryDictionaryExists(id))
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

        // POST: api/InjuryDictionaries
        [ResponseType(typeof(InjuryDictionary))]
        public IHttpActionResult PostInjuryDictionary(InjuryDictionary injuryDictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _ctx.InjuryDictionaries.Add(injuryDictionary);
            _ctx.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = injuryDictionary.Id }, injuryDictionary);
        }

        // DELETE: api/InjuryDictionaries/5
        [ResponseType(typeof(InjuryDictionary))]
        public IHttpActionResult DeleteInjuryDictionary(int id)
        {
            InjuryDictionary injuryDictionary = _ctx.InjuryDictionaries.Find(id);
            if (injuryDictionary == null)
            {
                return NotFound();
            }

            _ctx.InjuryDictionaries.Remove(injuryDictionary);
            _ctx.SaveChanges();

            return Ok(injuryDictionary);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _ctx.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InjuryDictionaryExists(int id)
        {
            return _ctx.InjuryDictionaries.Count(e => e.Id == id) > 0;
        }
    }
}