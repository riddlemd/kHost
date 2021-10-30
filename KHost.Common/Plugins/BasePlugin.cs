using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Plugins
{
    public class BasePlugin : IPlugin
    {
        public string Path { get; }

        public PluginSettings Settings { get; }

        public List<Assembly> Assemblies { get; } = new();

        public BasePlugin(PluginSettings settings, string path, IEnumerable<Assembly>? assemblies = null)
        {
            Settings = settings;
            Path = path;

            if(assemblies != null)
                Assemblies.AddRange(assemblies);
        }

        public IPlugin RegisterAssembly(Assembly assembly)
        {
            Assemblies.Add(assembly);

            return this;
        }

        public IEnumerable<Assembly> GetAssemblies() => Assemblies.ToArray();
    }
}
