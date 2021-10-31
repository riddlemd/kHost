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

        protected List<Assembly> _assemblies = new();

        public BasePlugin(PluginSettings settings, string path, IEnumerable<Assembly>? assemblies = null)
        {
            Settings = settings;
            Path = path;

            if(assemblies != null)
                _assemblies.AddRange(assemblies);
        }

        public IPlugin RegisterAssembly(Assembly assembly)
        {
            _assemblies.Add(assembly);

            return this;
        }

        public IEnumerable<Assembly> GetAssemblies() => _assemblies.ToArray();
    }
}
