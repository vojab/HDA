using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT.HDA.Models
{
    public class RequestStatusChanges
    {
        [Key]
        public int RequestStatusChangesId { get; set; }

        public int RequestStatusId { get; set; }
        [ForeignKey("RequestStatusId")]
        public virtual RequestStatus RequestStatus { get; set; }

        // Foreign key
        public int RequestId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
