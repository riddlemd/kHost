namespace KHost.App.Models
{
    public class SongSearchResult : BaseModel
    {
        public string Id { get; set; }

        public string SongName { get; set; }

        public string BandName { get; set; }

        public string EngineName { get; set; }

        public int? LengthInSeconds { get; set; } 
    }
}
