using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public interface IModelWithId
    {
        public int? Id { get; set; }
    }
}
