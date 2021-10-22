using System.ComponentModel.DataAnnotations;

namespace KHost.App.Models.Requests
{
    public class GenericIdRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
