using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Providers
{
    public interface ISongSearchProvider
    {
        IEnumerable<SongSearchEngineDetails> GetSongSearchEngineDetails();
        Task<IEnumerable<SongSearchResult>> Search(string searchQuery, string searchEngine, int? count = null, int? offset = null);
    }
}