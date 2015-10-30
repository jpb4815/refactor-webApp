using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PTWebApp.Models
{
    public class PatientModel
    {
        public int PatientId { get; set; }

        public string FirstName { get; set; }

        public string lastName { get; set; }

        public int MRN { get; set; }

        public string SocialSecurityNumber { get; set; }

        public string InjuryType { get; set; }

        public DateTime InjuryDate { get; set; }
    }
}