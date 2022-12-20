using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KHost.EntityFramework
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddEntityFrameworkRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services
                // Database
                .AddDbContextPool<DatabaseContext>(options => options.UseSqlite(configuration.GetConnectionString("Default")))
                // Repositories
                .AddScoped<ISongsRepository, EntityFrameworkSongsRepository>()
                .AddScoped<ISingersRepository, EntityFrameworkSingersRepository>()
                .AddScoped<IQueuedSingersRepository, EntityFrameworkQueuedSingerRepository>()
                .AddScoped<IQueuedSongsRepository, EntityFrameworkQueuedSongRepository>()
                .AddScoped<IVenuesRepository, EntityFrameworkVenuesRepository>()
                .AddScoped<IDownloadsRepository, EntityFrameworkDownloadsRepository>()
                .AddScoped<IUsersRepository, EntityFrameworkUsersRepository>()
                .AddScoped<ISingerPerformancesRepository, EntityFrameworkSingerPerformancesRepository>();

            return services;
        }
    }
}
