using System;

namespace FIT.HDA.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserDescription { get; set; }
        public int UserTypeId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
