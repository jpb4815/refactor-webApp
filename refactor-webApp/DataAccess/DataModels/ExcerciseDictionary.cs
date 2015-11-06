using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    public class ExcerciseDictionary
    {   
        public int Id { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public string Metrics { get; set; }
    }
}