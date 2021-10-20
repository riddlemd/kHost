using Microsoft.EntityFrameworkCore;

namespace KHost.Common.Repositories
{
    public interface IRepositoryWithContext
    {
        public IRepositoryContext Context { get; }
    }
}
