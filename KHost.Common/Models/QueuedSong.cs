namespace KHost.Common.Models
{
    public class QueuedSong : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public int SongId { get; set; }

        public int QueuedSingerId { get; set; }

        public float Position { get; set; }
    }
}
