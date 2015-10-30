using System;
using System.Collections.Generic;
using System.Web.Hosting;
using Newtonsoft.Json;
using PTWebApp.Models;


namespace DataAccessLayer.Repositories
{
    public class PatientRepository
    {
        /// <summary>
        /// Crates a new patient and sets date of injury
        /// </summary>
        /// <returns></returns>
        internal PatientModel Create()
        {
            PatientModel patient = new PatientModel()
            {
                InjuryDate = DateTime.Now
            };
            return patient;
        }
        /// <summary>
        /// Retrieves the list of Patients.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PatientModel> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/Patient.json");

            var json = System.IO.File.ReadAllText(filePath);

            IEnumerable<PatientModel> patients = JsonConvert.DeserializeObject<IEnumerable<PatientModel>>(json);

            return patients;
        }

        ///// <summary>
        ///// Saves a new Patient.
        ///// </summary>
        ///// <param name="Patient"></param>
        ///// <returns></returns>
        //internal PatientModel Save(PatientModel Patient)
        //{
        //    // Read in the existing Patients
        //    var Patients = this.Retrieve();

        //    // Assign a new Id
        //    var maxId = Patients.Max(p => p.PatientId);
        //    Patient.PatientId = maxId + 1;
        //    Patients.Add(Patient);

        //    WriteData(Patients);
        //    return Patient;
        //}

        ///// <summary>
        ///// Updates an existing Patient
        ///// </summary>
        ///// <param name="id"></param>
        ///// <param name="Patient"></param>
        ///// <returns></returns>
        //internal PatientModel Save(int id, PatientModel Patient)
        //{
        //    // Read in the existing Patients
        //    var Patients = this.Retrieve();

        //    // Locate and replace the item
        //    var itemIndex = Patients.FindIndex(p => p.PatientId == Patient.PatientId);
        //    if (itemIndex > 0)
        //    {
        //        Patients[itemIndex] = Patient;
        //    }
        //    else
        //    {
        //        return null;
        //    }

        //    WriteData(Patients);
        //    return Patient;
        //}

        //private bool WriteData(List<PatientModel> Patients)
        //{
        //    // Write out the Json
        //    var filePath = HostingEnvironment.MapPath(@"~/App_Data/Patient.json");

        //    var json = JsonConvert.SerializeObject(Patients, Formatting.Indented);
        //    System.IO.File.WriteAllText(filePath, json);

        //    return true;
        //}



    }
}