using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class UserType
    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
        public string UserTypeDescription { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
