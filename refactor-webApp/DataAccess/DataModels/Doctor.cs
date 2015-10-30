using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PTWebApp.DataModels
{
    public class Doctor
    {
        public Doctor()
        {
            Patients = new List<Patient>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int UserId { get; set; }
        public int PatientId { get; set; }
        public List<Patient> Patients { get; set; }


    }
}