using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using PTWebApp.DataModels;
using Patient = PTWebApp.Models;

namespace PTWebApp.DataContext
{
    
    public class PatientContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<DataModels.Patient> Patient { get; set; }

    }
}