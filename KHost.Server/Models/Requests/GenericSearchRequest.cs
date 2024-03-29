﻿using System.ComponentModel.DataAnnotations;

namespace KHost.Server.Models.Requests
{
    public class GenericSearchRequest : GenericPaginatedRequest
    {
        [Required]
        public string? Query { get; set; }
    }
}
