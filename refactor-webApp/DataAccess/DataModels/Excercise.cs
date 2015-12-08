using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    /// <summary>
    /// excercise table, my misspelling is propegated all the way down to the data base
    /// </summary>
    public class Excercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Repetitions { get; set; }
        public string InjuryType { get; set; }
        public int ExcerciseDictionaryID { get; set; }

    }
}