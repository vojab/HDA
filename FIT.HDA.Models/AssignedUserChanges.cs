using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIT.HDA.Models
{
    public class AssignedUserChanges
    {
        public int AssignedUserChangesId { get; set; }
        public int UserId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
