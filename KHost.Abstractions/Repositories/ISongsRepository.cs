using KHost.Abstractions.Models;

namespace KHost.Abstractions.Repositories
{
    public interface ISongsRepository : IRepository<Song>, ISearchableRepository<Song>
    {

    }
}
