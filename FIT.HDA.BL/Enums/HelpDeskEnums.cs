using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Enums
{
    class HelpDeskEnums
    {
        public enum RequestStatus
        {
            Open,
            Accepted,
            Processed,
            Finished,
            Denied,
            Closed,
            Archived
        }

        public enum UserTypes
        {
            BusinessProvider,
            Client,
            HelpDeskPersonnel,
            Administrator
        }
    }
}