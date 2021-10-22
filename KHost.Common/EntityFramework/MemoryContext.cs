using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.EntityFramework
{
    public class MemoryContext : BaseContext
    {
        public virtual DbSet<Download> Downloads { get; set; }

        public MemoryContext(DbContextOptions<MemoryContext> options) : base(options)
        {

        }
    }
}
