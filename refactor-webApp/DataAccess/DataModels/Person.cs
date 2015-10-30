using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PTWebApp.DataModels
{
    public class Person
    {
        public Person()
        {
            Addresses = new List<Address>();
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MrnNumber { get; set; }
        public string SocialSecurityNumber { get; set; }
        public int PatientId { get; set; }
        public int AddressId { get; set; }
        public List<Address> Addresses { get; set; }

    }
}