﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT.HDA.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public string RequestDescription { get; set; }
        public bool RequestReadyForArchive { get; set; }
        public DateTime RequestOpenDate { get; set; }
        public DateTime RequestClosedDate { get; set; }

        // --- Code First DEFINITION
        public int? TimeManagamentId { get; set; }
        [ForeignKey("TimeManagamentId")]
        public virtual TimeManagament TimeManagament { get; set; }

        [ForeignKey("ProductId")]
        //public int? RequestProductId { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        // -------------------------

        // TODO: Code first connections define bellow - IMPLEMENT LATER
        //public int RequestStatusId { get; set; }
        //public int CurrentlyAssignedUserId { get; set; }
        //public int RequestKnowlegeBaseEntryId { get; set; }
        //public int RequestAttachmentId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}