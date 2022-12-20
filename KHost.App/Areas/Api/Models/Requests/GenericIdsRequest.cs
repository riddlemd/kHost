using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KHost.App.Areas.Api.Models.Requests
{
    public class GenericIdsRequest
    {
        [Required]
        public string? Ids { get; set; }

        public IEnumerable<int> GetIdsAsInts() => Array.ConvertAll(Ids?.Split(',') ?? Array.Empty<string>(), int.Parse);
    }
}
