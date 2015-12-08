using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    /// <summary>
    /// Program table, a patient had a program so there is a FK refernce back to the user table
    /// </summary>
    public class Program
    {
        public Program()
        {
            Excercises = new List<Excercise>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string InjuryType { get; set; }
        public int UserId { get; set; }
        public List<Excercise> Excercises { get; set; } 

    }
}