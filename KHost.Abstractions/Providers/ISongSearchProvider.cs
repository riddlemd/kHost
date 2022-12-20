using KHost.Abstractions.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Abstractions.Providers
{
    public interface ISongSearchProvider
    {
        IEnumerable<SongSearchEngineDetails> GetSongSearchEngineDetails();

        Task<IEnumerable<SongSearchResult>> SearchAsync(string searchQuery, string searchEngine, int? count = null, int? offset = null);

        Task<Song> GetSongAsync(string id, string searchEngine);

        Task<Download> DownloadSongAsync(string id, string searchEngine, int songId);
    }
}