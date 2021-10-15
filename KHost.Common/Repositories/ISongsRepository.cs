using KHost.Common.Models;

namespace KHost.Common.Repositories
{
    public interface ISongsRepository : IRepository<Song>, ISearchableRepository<Song>
    {
        
    }
}
