using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public class QueuedSinger : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public int Position { get; set; }

        public int SingerId { get; set; }

        public Singer Singer { get; set; }

        [NotMapped]
        public int QueuedSongsCount { get; set; }
    }
}
