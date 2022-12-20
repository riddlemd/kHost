using KHost.Abstractions.Models;

namespace KHost.Abstractions.SongImporters
{
    public interface ISongImporter
    {
        public string Name { get; }

        public Task<IEnumerable<ImportableSong>> Find(string path);

        public Task<ImportableSong> GetDetails(string path);

        public Task<Song> Import(string path);
    }
}
