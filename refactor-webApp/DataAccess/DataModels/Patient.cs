using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PTWebApp.DataModels
{
    public class Patient
    {
        public int PatientId { get; set; }
        public string FirstName { get; set; }
        public string lastName { get; set; }
        public int MRN { get; set; }
        public string SocialSecurityNumber { get; set; }
        public string InjuryType { get; set; }
        public DateTime InjuryDate { get; set; }
        public int PersonId { get; set; }
    }
}