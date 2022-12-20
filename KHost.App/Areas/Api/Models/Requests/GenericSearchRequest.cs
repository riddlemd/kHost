using System.ComponentModel.DataAnnotations;

namespace KHost.App.Areas.Api.Models.Requests
{
    public class GenericSearchRequest : GenericPaginatedRequest
    {
        [Required]
        public string? Query { get; set; }
    }
}
