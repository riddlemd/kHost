using KHost.Common.Reflection;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddSearchEnginesDynamically(this IServiceCollection services)
        {
            var types = ClassFinder.GetChildrenOf<ISongSearchEngine>();

            foreach (var type in types)
            {
                services.AddTransient(p => (ActivatorUtilities.CreateInstance(p, type) as ISongSearchEngine)!);
            }

            return services;
        }
    }
}
