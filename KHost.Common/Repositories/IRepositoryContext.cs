using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IRepositoryContext : IDisposable
    {
        Task<bool> Save();
    }
}
