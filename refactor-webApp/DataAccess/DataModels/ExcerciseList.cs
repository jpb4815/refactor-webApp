using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    /// <summary>
    /// List of excercises associated with a program
    /// </summary>
    public class ExcerciseList
    {
        public int Id { get; set; }
        public Excercise Excercise { get; set; }
        public int ProgramId { get; set; }
        public int ExcerciseDictionaryId { get; set; }
    }
}