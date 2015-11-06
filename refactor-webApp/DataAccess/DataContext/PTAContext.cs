using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations.Model;
using System.Linq;
using System.Web;
using DataAccess.DataModels;
using PTWebApp.DataModels;
using Patient = PTWebApp.Models;

namespace PTWebApp.DataContext
{
    
    public class PTAContext : DbContext
    {
        public PTAContext()
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<PTAContext,PTAContextMigrationsConfiguration>());

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Excercise>Excercises { get; set; }
        public DbSet<ExcerciseDictionary> ExcerciseDictionaries { get; set; }
        public DbSet<InjuryDictionary>InjuryDictionaries { get; set; }  
        public DbSet<Program>Programs { get; set; } 
        public DbSet<Results> Results { get; set; } 
      

    }
}