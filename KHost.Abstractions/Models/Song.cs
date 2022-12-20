namespace KHost.Abstractions.Models
{
    public class Song : BaseModel, IModelWithId, IModelWithName
    {
        public int? Id { get; set; }

        public string Name { get; set; } = "";

        public string BandName { get; set; } = "";

        public string Source { get; set; } = "";

        public string KaraokeBrand { get; set; } = "";

        public string Notes { get; set; } = "";

        public string? LocalPath { get; set; }

        public string? RemotePath { get; set; }

        public SongState State { get; set; }

        public int LengthInSeconds { get; set; }

        public uint? Crc32 { get; set; }

        public override Song Clone() => (base.Clone() as Song)!;
    }

    public enum SongState
    {
        Unknown,
        Ready,
        Broken,
        Downloading
    }
}