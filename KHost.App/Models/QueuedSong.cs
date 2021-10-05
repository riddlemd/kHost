namespace KHost.App.Models
{
    public class QueuedSong : BaseModel, IModelWithPosition
    {
        public int SongId { get; set; }

        public int UserId { get; set; }

        public int Position { get; set; }
    }
}
