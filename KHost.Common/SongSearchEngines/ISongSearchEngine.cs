using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public interface ISongSearchEngine
    {
        public Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset);

        public SongSearchEngineDetails GetDetails();
    }
}
