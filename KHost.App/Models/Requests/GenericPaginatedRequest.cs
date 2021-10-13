using System;
using System.ComponentModel.DataAnnotations;

namespace KHost.App.Models.Requests
{
    public class GenericPaginatedRequest
    {
        [Range(1, 100)]
        public int Count { get; set; } = 20;

        [Range(0, int.MaxValue)]
        public int Offset { get; set; } = 0;
    }
}
