using Microsoft.EntityFrameworkCore;

namespace KHost.Common.Repositories.EF
{
    public interface IRepositoryWithDbContext
    {
        public DbContext Context { get; }
    }
}
