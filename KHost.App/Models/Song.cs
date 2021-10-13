using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public class Song : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string BandName { get; set; }
    }
}
