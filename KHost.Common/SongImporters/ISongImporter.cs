using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.SongImporters
{
    public interface ISongImporter
    {
        public string Name { get; }

        public Task<IEnumerable<ImportableSong>> Find(string path);

        public Task<ImportableSong> GetDetails(string path);

        public Task<Song> Import(string path);
    }
}
