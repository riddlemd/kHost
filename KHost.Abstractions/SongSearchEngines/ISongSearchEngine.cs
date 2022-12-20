using KHost.Abstractions.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Abstractions.SongSearchEngines
{
    public interface ISongSearchEngine
    {
        string Name { get; }

        Task<IEnumerable<SongSearchResult>> SearchAsync(string searchQuery, int? count, int? offset);

        SongSearchEngineDetails GetDetails();

        Task<Song> GetSongAsync(string id);

        Task<Download> DownloadSongAsync(string id, int songId);
    }
}
