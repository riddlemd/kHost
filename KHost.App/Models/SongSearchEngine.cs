namespace KHost.App.Models
{
    public class SongSearchEngine : BaseModel
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public bool IsLocal { get; set; } = true;

        public bool AllowDownload { get; set; } = false;
    }
}
