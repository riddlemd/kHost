using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Abstractions.Repositories
{
    public interface IRepositoryContext : IDisposable
    {
        Task<bool> SaveAsync();
    }
}
