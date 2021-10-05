using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public class QueuedSinger : BaseModel, IModelWithPosition
    {
        public int Position { get; set; }
    }
}
