namespace KHost.Abstractions.Models
{
    public class QueuedSong : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public int SongId { get; set; }

        public int QueuedSingerId { get; set; }

        public int Position { get; set; }

        public override QueuedSong Clone() => (base.Clone() as QueuedSong)!;
    }
}
