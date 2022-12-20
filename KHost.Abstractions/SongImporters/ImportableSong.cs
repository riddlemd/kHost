using KHost.Abstractions.Models;

namespace KHost.Abstractions.SongImporters
{
    public class ImportableSong : Song
    {
        public bool Populated { get; set; }
    }
}
