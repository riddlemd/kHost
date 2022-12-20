using KHost.Abstractions.Models;

namespace KHost.Abstractions.SongImporters
{
    public interface ISongImporter
    {
        public string Name { get; }

        public Task<IEnumerable<ImportableSong>> FindAsync(string path);

        public Task<ImportableSong> GetDetailsAsync(string path);

        public Task<Song> ImportAsync(string path);
    }
}
