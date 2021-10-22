using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models.Requests
{
    public class MoveBeforeRequest : GenericIdRequest
    {
        [Required]
        public int? BeforeId { get; set; }
    }
}
