using KHost.Common.Reflection;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.SongImporters
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddSongImportersDynamically(this IServiceCollection services)
        {
            var types = ClassFinder.GetChildrenOf<ISongImporter>();

            foreach (var type in types)
            {
                services.AddTransient(p => (ActivatorUtilities.CreateInstance(p, type) as ISongImporter)!);
            }

            return services;
        }
    }
}
