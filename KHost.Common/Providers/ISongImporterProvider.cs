using KHost.Common.SongImporters;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Providers
{
    public interface ISongImporterProvider
    {
        public Task<IEnumerable<ImportableSong>> Find(string path, string importerName);

        public Task<ImportableSong> GetDetails(string path, string importerName);
    }
}
