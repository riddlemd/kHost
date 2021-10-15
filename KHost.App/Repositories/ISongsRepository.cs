using KHost.Common.Models;

namespace KHost.App.Repositories
{
    public interface ISongsRepository : IRepository<Song>, ISearchableRepository<Song>
    {
        
    }
}
