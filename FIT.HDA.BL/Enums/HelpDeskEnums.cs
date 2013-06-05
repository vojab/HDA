namespace FIT.HDA.BL.Enums
{
    public class HelpDeskEnums
    {
        public enum RequestStatus
        {
            Dummy,
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