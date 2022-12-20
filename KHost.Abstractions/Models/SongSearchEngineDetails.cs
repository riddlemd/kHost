namespace KHost.Abstractions.Models
{
    public class SongSearchEngineDetails : BaseModel
    {
        public string Name { get; set; } = "";

        public string DisplayName { get; set; } = "";

        public bool IsLocal { get; set; } = true;

        public bool AllowDownload { get; set; } = false;

        public override SongSearchEngineDetails Clone() => (base.Clone() as SongSearchEngineDetails)!;
    }
}
