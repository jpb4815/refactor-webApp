using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccess.DataModels;
using PTWebApp.DataContext;
using PTWebApp.DataModels;

namespace DataAccess.Repositories
{
    /// <summary>
    /// This is the repository with the methods exposed to get data fromthe BD through entity framework.
    /// I am using Dependency Injection to inject the context object as a singleton into the contructor of this 
    /// class. 
    /// </summary>
    public class PtaRepository : IPtaRepository
    {
        private PTAContext _ctx;

        public PtaRepository(PTAContext ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<Excercise> GetExcercises()
        {
            return _ctx.Excercises;
        }

        public IQueryable<Excercise> GetExcerciseById(int excerciseId)
        {
            return _ctx.Excercises.Where(e => e.Id == excerciseId);
        }

        public IQueryable<Program> GetPrograms()
        {
            return _ctx.Programs;
        }

        public IQueryable<Program> GetProgramById(int programId)
        {
            return _ctx.Programs.Where(p => p.Id == programId);
        }

        public IQueryable<Results> GetResults()
        {
            return _ctx.Results;
        }

        public IQueryable<Results> GetResultsById(int resultId)
        {
            return _ctx.Results.Where(r => r.Id == resultId);
        }


        public IQueryable<User> GetUsers()
        {
           return _ctx.Users.Where(u => u.UseRole == Role.Patient);
        }

        public IQueryable<User> GetUserById(int userId)
        {
            return _ctx.Users.Where(u => u.Id == userId);
        }

        public IQueryable<ExcerciseDictionary> GetExcerciseDictionaryResults()
        {
            return _ctx.ExcerciseDictionaries;
        }

        public IQueryable<ExcerciseDictionary> GetExcerciseDictionaryEntryById(int edId)
        {
            return _ctx.ExcerciseDictionaries.Where(e => e.Id == edId);
        } 

        public IQueryable<InjuryDictionary> GetInjuryDictionaryResults()
        {
            return _ctx.InjuryDictionaries;
        }

        public IQueryable<InjuryDictionary> GetInjuryById(int injuryId)
        {
            return _ctx.InjuryDictionaries.Where(i => i.Id == injuryId);
        } 
    }
}