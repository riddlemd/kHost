using System;
using System.Collections.Generic;

namespace KHost.App.Models.Requests
{
    public class GenericIdsRequest
    {
        public string Ids { get; set; }

        public IEnumerable<int> GetIdsAsInts() => Array.ConvertAll(Ids?.Split(',') ?? Array.Empty<string>(), int.Parse);
    }
}
