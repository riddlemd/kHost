using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Reflection;

namespace KHost.Common.Plugins
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection LoadPlugins(this IServiceCollection services)
        {
            var cwd = Directory.GetCurrentDirectory();
            var pluginDirectories = Directory.GetDirectories(cwd + Path.DirectorySeparatorChar + "Plugins");
            foreach (var pluginDirectory in pluginDirectories)
            {
                var pluginDlls = Directory.GetFiles(pluginDirectory, "*.dll");

                foreach (var pluginDll in pluginDlls)
                {
                    var pluginAssembly = new PluginAssembly(pluginDll, Assembly.LoadFile(pluginDll));

                    services.AddSingleton<IPluginAssembly>(pluginAssembly);
                }
            }

            return services;
        }
    }
}
