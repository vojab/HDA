using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT.HDA.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }

        // --- Code First DEFINITION
        //public int? RequestId { get; set; }
        //[ForeignKey("RequestId")]
        //public virtual Request Request { get; set; }
        // -------------------------
        
        // TODO: Code First for User - Implement later
        //public int BusinessProviderId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
