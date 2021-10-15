using KHost.App.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.Sql
{
    public class SqlVenuesRepository : BaseSqlRepository<Venue>
    {
        public SqlVenuesRepository(DbContext context) : base(context)
        {

        }
    }
}
