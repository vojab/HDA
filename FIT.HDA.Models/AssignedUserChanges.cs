using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIT.HDA.Models
{
    public class AssignedUserChanges
    {
        public int AssignedUserChangesId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        // Foreign key
        public int RequestId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
