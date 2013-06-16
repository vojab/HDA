namespace FIT.HDA.BL.Enums
{
    public class HelpDeskEnums
    {
        public enum RequestStatus
        {
            Open = 1,
            Accepted = 2,
            Processed = 3,
            Finished = 4,
            Denied = 5,
            Closed = 6,
            Archived = 7
        }

        public enum UserTypes
        {
            BusinessProvider,
            Client,
            HelpDeskPersonnel,
            Administrator
        }

        public enum Status
        {
            Deleted = 0,
            Active = 1
        }
    }
}