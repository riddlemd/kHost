﻿using System;
using System.ComponentModel.DataAnnotations;

namespace KHost.Server.Models.Requests
{
    public class GenericPaginatedRequest
    {
        [Range(1, int.MaxValue)]
        public int? Count { get; set; }

        [Range(0, int.MaxValue)]
        public int? Offset { get; set; }
    }
}
