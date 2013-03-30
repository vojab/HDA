using System;

namespace FIT.HDA.Models
{
    public class TimeManagament
    {
        public int TimeManagamentId { get; set; }
        public int EstimationTimeInHours { get; set; }
        public int RecordTimeInHours { get; set; }

        // --- Code First DEFINITION
        //public Request Request { get; set; }
        // -------------------------

        public DateTime DateCreated { get; set; }
    }
}
