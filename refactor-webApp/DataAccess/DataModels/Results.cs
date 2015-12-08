using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    /// <summary>
    /// results table. this is where the data for the graphical metrics is stored
    /// </summary>
    public class Results
    {
        public int  Id { get; set; }
        public string ExcerciseName { get; set; }
        public string Repetitions { get; set; }
        public string StartingResistance { get; set; }
        public string CurrentResistence { get; set; }
        public DateTime StartProgram { get; set; }
        public DateTime CurrenTime { get; set; }
        public DateTime EndProgram { get; set; }
        public int ProgramId { get; set; }
    }
}