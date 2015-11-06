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
        public User()
        {
            Users = new List<User>();
        }
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public Role UseRole { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string County { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string ZipCode { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Telephone { get; set; }
        [Required]
        public string Telephone2 { get; set; }
        public int MRN { get; set; }
        public string SocialSecurityNumber { get; set; }
        public string InjuryType { get; set; }
        public DateTime InjuryDate { get; set; }
        public string Location { get; set; }
        public List<User> Users { get; set; } 
    }
}
public enum Role
{
    Admin = 1,
    Doctor = 2,
    Therapist = 3,
    Patient = 4
}