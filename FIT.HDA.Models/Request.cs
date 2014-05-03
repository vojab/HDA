using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace FIT.HDA.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public string RequestSubject { get; set; }
        public string RequestDescription { get; set; }
        public bool RequestReadyForArchive { get; set; }
        public DateTime RequestOpenDate { get; set; }
        public DateTime RequestClosedDate { get; set; }
        public int? Estimated { get; set; }
        public int? Logged { get; set; }

        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        //public int? TimeManagamentId { get; set; }
        //[ForeignKey("TimeManagamentId")]
        //public virtual TimeManagament TimeManagament { get; set; }

        [JsonIgnore] 
        [IgnoreDataMember] 
        public virtual ICollection<Attachment> Attachments { get; set; }

        public virtual ICollection<RequestStatusChanges> RequestStatusChanges { get; set; }

        public virtual ICollection<AssignedUserChanges> AssignedUserChanges { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
