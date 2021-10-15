using System.ComponentModel.DataAnnotations.Schema;

namespace KHost.App.Models
{
    public class QueuedSinger : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public float Position { get; set; }

        public int SingerId { get; set; }

        public Singer Singer { get; set; }

        [NotMapped]
        public int QueuedSongsCount { get; set; }
    }
}
