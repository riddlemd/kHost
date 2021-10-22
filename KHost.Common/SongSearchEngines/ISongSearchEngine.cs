using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public interface ISongSearchEngine
    {
        string Name { get; }

        Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset);

        SongSearchEngineDetails GetDetails();

        Task<Song> GetSong(string id);

        Task<Download> DownloadSong(string id, int songId);
    }
}
