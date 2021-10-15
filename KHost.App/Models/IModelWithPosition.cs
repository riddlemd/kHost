using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public interface IModelWithPosition
    {
        public float Position { get; set; }
    }
}
