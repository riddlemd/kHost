using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Reflection;
using Newtonsoft.Json;

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
                var pluginSettingsJson = File.ReadAllText(pluginDirectory + Path.DirectorySeparatorChar + "plugin.json");

                var pluginSettings = JsonConvert.DeserializeObject<PluginSettings>(pluginSettingsJson);

                if (pluginSettings == null) continue;

                var plugin = new BasePlugin(pluginSettings, pluginDirectory);
                
                var pluginDlls = Directory.GetFiles(pluginDirectory, "*.dll");

                foreach (var pluginDll in pluginDlls)
                {
                    plugin.RegisterAssembly(Assembly.LoadFile(pluginDll));
                }

                services.AddSingleton<IPlugin>(plugin);
            }

            return services;
        }
    }
}
