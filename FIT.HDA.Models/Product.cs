using System;
using System.ComponentModel.DataAnnotations;

namespace FIT.HDA.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }

        // --- Code First DEFINITION
        public virtual Request Request { get; set; }
        public int? RequestId { get; set; }
        // -------------------------
        
        // TODO: Code First for User - Implement later
        //public int BusinessProviderId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
