using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;

namespace DataAccess.DataModels
{
    public class InjuryDictionary
    {        
        public int Id { get; set; }
        public string Injury { get; set; }
        public string Description { get; set; }
        public string IcdCode { get; set; }       
    }
}