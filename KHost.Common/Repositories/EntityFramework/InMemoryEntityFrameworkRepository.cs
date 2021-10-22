using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class InMemoryEntityFrameworkRepository<TModel> : BaseEntityFrameworkRepository<TModel>
        where TModel : class, IModelWithId
    {

        public InMemoryEntityFrameworkRepository(MemoryContext memoryContext) : base(memoryContext)
        {

        }
    }
}
