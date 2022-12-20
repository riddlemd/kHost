using System.ComponentModel.DataAnnotations;

namespace KHost.App.Areas.Api.Models.Requests
{
    public class GenericIdRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
