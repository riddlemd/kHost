using System.ComponentModel.DataAnnotations;

namespace KHost.App.Models.Requests
{
    public class GenericSearchRequest : GenericPaginatedRequest
    {
        [Required]
        public string? Query { get; set; }
    }
}
