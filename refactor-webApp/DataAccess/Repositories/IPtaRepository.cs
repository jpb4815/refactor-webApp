using System.Linq;
using DataAccess.DataModels;
using PTWebApp.DataModels;

namespace DataAccess.Repositories
{
    public interface IPtaRepository
    {

        IQueryable<Excercise> GetExcercises();
        IQueryable<Excercise> GetExcerciseById(int excerciseId);
        IQueryable<Program> GetPrograms();
        IQueryable<Program> GetProgramById(int programId);
        IQueryable<Results> GetResults();
        IQueryable<Results> GetResultsById(int resultId);
        IQueryable<User> GetUsers();
        IQueryable<User> GetUserById(int userId);
        IQueryable<ExcerciseDictionary> GetExcerciseDictionaryResults();
        IQueryable<InjuryDictionary> GetInjuryDictionaryResults();


    }
}