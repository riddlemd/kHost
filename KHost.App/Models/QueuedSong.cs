namespace KHost.App.Models
{
    public class QueuedSong : BaseModel, IModelWithPosition, IModelWithId
    {
        public int? Id { get; set; }

        public int SongId { get; set; }

        public int SingerId { get; set; }

        public int Position { get; set; }

        public Song Song { get; set; }

        public Singer Singer { get; set; }
    }
}
