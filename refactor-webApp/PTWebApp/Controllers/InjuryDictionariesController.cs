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

        /// <summary>
        /// using DI to inject context in single use scope
        /// </summary>
        /// <param name="ctx"></param>
        public InjuryDictionariesController(PTAContext ctx)
        {
            _ctx = ctx;
        }


        /// <summary>
        /// GET: api/InjuryDictionaries
        /// Gets a list of dictionary entries or a single entry based on query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
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


        /// <summary>
        /// PUT: api/InjuryDictionaries/5
        /// Updates a dictionary entry
        /// </summary>
        /// <param name="id"></param>
        /// <param name="injuryDictionary"></param>
        /// <returns></returns>
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


        /// <summary>
        /// POST: api/InjuryDictionaries
        /// adds a dictionary entry
        /// </summary>
        /// <param name="injuryDictionary"></param>
        /// <returns></returns>
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

         
        /// <summary>
        /// DELETE: api/InjuryDictionaries/5
        /// deletes a dictionary entry
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        private bool InjuryDictionaryExists(int id)
        {
            return _ctx.InjuryDictionaries.Count(e => e.Id == id) > 0;
        }
    }
}