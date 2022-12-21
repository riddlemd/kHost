using KHost.Abstractions.SongSearchEngines;
using KHost.Common.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace KHost.App.SongSearchEngines
{
    internal static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddSearchEnginesDynamically(this IServiceCollection services)
        {
            var types = ClassFinder.GetChildrenOf<ISongSearchEngine>();

            foreach (var type in types)
            {
                services.AddTransient(p => (ISongSearchEngine)ActivatorUtilities.CreateInstance(p, type));
            }

            return services;
        }
    }
}
