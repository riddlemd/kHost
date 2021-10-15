using KHost.Common.Models;

namespace KHost.App.Repositories
{
    public interface ISongSearchRepository : ISearchableRepository<SongSearchResult>
    {
        public SongSearchEngine EngineDefinition { get; }
    }
}
