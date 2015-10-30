using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PTWebApp.DataModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public Role UseRole { get; set; }
        [Required]
        public Person PersonId { get; set; }
        [Required]
        public Patient PatientId { get; set; }
        [Required]
        public DateTime LastLoggedIn { get; set; }
    }
}
public enum Role
{
    Admin = 1,
    Doctor = 2,
    Therapist = 3,
    Patient = 4
}