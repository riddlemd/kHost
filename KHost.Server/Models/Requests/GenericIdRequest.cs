using System.ComponentModel.DataAnnotations;

namespace KHost.Server.Models.Requests
{
    public class GenericIdRequest
    {
        [Required]
        public int? Id { get; set; }
    }
}
