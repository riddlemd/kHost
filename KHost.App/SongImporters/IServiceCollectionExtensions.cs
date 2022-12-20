using KHost.Abstractions.SongImporters;
using KHost.Common.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace KHost.App.SongImporters
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
