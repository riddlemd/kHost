using KHost.Abstractions.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.EntityFramework.Repositories.Components
{
    internal class SearchComponent<TModel>
        where TModel : class
    {
        private readonly DbContext _context;
        private readonly Func<string, TModel, bool> _searchExpression;

        public SearchComponent(DbContext context, Func<string, TModel, bool> searchExpression)
        {
            _context = context;
            _searchExpression = searchExpression;
        }

        public async Task<IEnumerable<TModel>> SearchAsync(string searchQuery, int? count, int? offset)
        {
            var query = _context.Set<TModel>().AsQueryable()
                .Where(model => _searchExpression(searchQuery, model));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToListAsync();
        }
    }
}
