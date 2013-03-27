using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class Attachment
    {
        public int AttachmentId { get; set; }
        public string AttachmentName { get; set; }
        public int AttachmentType { get; set; }
        public string AttachmentInfo { get; set; }
        public string AttachmentLocation { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
