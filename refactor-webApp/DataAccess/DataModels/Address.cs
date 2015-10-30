using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PTWebApp.DataModels
{
    public class Address
    {
        public Address()
        {
            PeopleList = new List<Person>();
        }
        public int Id { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Telephone { get; set; }
        public string Telephone2 { get; set; }
        public int PersonId { get; set; }
        public List<Person> PeopleList { get; set; }
    }
}