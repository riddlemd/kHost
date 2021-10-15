using KHost.Common.Models;

namespace KHost.Common.Repositories
{
    public interface ISongSearchRepository : ISearchableRepository<SongSearchResult>
    {
        public SongSearchEngine EngineDefinition { get; }
    }
}
