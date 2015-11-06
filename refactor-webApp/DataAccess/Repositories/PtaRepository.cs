using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataAccess.DataModels;
using PTWebApp.DataContext;
using PTWebApp.DataModels;

namespace DataAccess.Repositories
{
    public class PtaRepository : IPtaRepository
    {
        private PTAContext _ctx;

        public PtaRepository(PTAContext ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<Excercise> GetExcercises()
        {
            throw new NotImplementedException();
        }

        public IQueryable<Excercise> GetExcerciseById(int excerciseId)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Program> GetPrograms()
        {
            throw new NotImplementedException();
        }

        public IQueryable<Program> GetProgramById(int programId)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Results> GetResults()
        {
            throw new NotImplementedException();
        }

        public IQueryable<Results> GetResultsById(int resultId)
        {
            throw new NotImplementedException();
        }


        public IQueryable<User> GetUsers()
        {
           return _ctx.Users.Where(u => u.UseRole == Role.Patient);
        }

        public IQueryable<User> GetUserById(int userId)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ExcerciseDictionary> GetExcerciseDictionaryResults()
        {
            throw new NotImplementedException();
        }

        public IQueryable<InjuryDictionary> GetInjuryDictionaryResults()
        {
            throw new NotImplementedException();
        }
    }
}