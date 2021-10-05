using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public interface IModelWithPosition
    {
        public int Position { get; set; }
    }
}
