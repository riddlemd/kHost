namespace KHost.Abstractions.Models
{
    public class SongSearchResult : BaseModel
    {
        public string Id { get; set; } = "";

        public string SongName { get; set; } = "";

        public string BandName { get; set; } = "";

        public string State { get; set; } = "Unknown";

        public string EngineName { get; set; } = "";

        public int? LengthInSeconds { get; set; }

        public override SongSearchResult Clone() => (base.Clone() as SongSearchResult)!;
    }
}
