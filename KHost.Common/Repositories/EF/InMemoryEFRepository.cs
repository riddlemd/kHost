using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public class InMemoryEFRepository<TModel> : BaseEFRepository<TModel>
        where TModel : class, IModelWithId
    {
        private static KHostDbContext GetDbContext()
        {
            var builder = new DbContextOptionsBuilder<KHostDbContext>().UseInMemoryDatabase(databaseName: "InMemory");

            return new KHostDbContext(builder.Options);
        }

        public InMemoryEFRepository() : base(GetDbContext())
        {

        }
    }
}
