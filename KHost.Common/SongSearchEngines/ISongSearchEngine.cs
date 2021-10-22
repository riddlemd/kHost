using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public interface ISongSearchEngine
    {
        public SongSearchEngine EngineDefinition { get; }

        public Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset);
    }
}
