namespace KHost.App.Models.Requests
{
    public class GenericSearchRequest : GenericPaginatedRequest
    {
        public string Query { get; set; }
    }
}
