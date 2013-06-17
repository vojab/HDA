using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT.HDA.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserDescription { get; set; }

        public int UserStatus { get; set; }

        public int? UserTypeId { get; set; }
        [ForeignKey("UserTypeId")]
        public virtual UserType UserType { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
