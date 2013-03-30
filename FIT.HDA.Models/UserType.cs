using System;

namespace FIT.HDA.Models
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
        public string UserTypeDescription { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
