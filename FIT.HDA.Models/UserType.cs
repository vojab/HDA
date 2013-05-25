using System;
using System.ComponentModel.DataAnnotations;

namespace FIT.HDA.Models
{
    public class UserType
    {
        [Key]
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
        public string UserTypeDescription { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
