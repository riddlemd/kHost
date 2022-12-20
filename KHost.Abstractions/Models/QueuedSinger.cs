using System.ComponentModel.DataAnnotations.Schema;

namespace KHost.Abstractions.Models
{
    public class QueuedSinger : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public int Position { get; set; }

        public int SingerId { get; set; }

        [NotMapped]
        public int QueuedSongsCount { get; set; }

        public override QueuedSinger Clone() => (base.Clone() as QueuedSinger)!;
    }
}
