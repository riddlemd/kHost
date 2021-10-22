using KHost.Common.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.EntityFramework
{
    public abstract class BaseContext : DbContext, IRepositoryContext
    {
        protected BaseContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }

        async Task<bool> IRepositoryContext.Save() => await SaveChangesAsync() > 0;
    }
}
