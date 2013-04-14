using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIT.HDA.Models
{
    public class Attachment
    {
        [Key]
        public int AttachmentId { get; set; }
        public string AttachmentName { get; set; }
        public int AttachmentType { get; set; }
        public string AttachmentInfo { get; set; }
        public string AttachmentLocation { get; set; }

        public DateTime DateCreated { get; set; }

        // --- Code First DEFINITION
        //public int? RequestId { get; set; }
        //[ForeignKey("RequestId")]
        //public virtual Request Request { get; set; }

        // Foreign key
        public int RequestId { get; set; }

        // Navigation properties
        public virtual Request Request { get; set; }
    }
}
