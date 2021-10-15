using KHost.App.Models;

namespace KHost.App.Repositories
{
    public interface ISongsRepository : IRepository<Song>, ISearchableRepository<Song>
    {
        
    }
}
