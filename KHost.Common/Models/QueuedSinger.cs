using System.ComponentModel.DataAnnotations.Schema;

namespace KHost.Common.Models
{
    public class QueuedSinger : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public float Position { get; set; }

        public int SingerId { get; set; }

        public Singer Singer { get; set; }

        [NotMapped]
        public int QueuedSongsCount { get; set; }

        public override QueuedSinger Clone() => base.Clone() as QueuedSinger;
    }
}
