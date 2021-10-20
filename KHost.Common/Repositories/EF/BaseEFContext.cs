using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public abstract class BaseEFContext : DbContext, IRepositoryContext
    {
        protected BaseEFContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }

        async Task<bool> IRepositoryContext.Save() => await SaveChangesAsync() > 0;
    }
}
