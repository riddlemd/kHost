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

        public BasePlugin(PluginSettings settings, string path)
        {
            Settings = settings;
            Path = path;
        }

        public IPlugin RegisterAssembly(Assembly assembly)
        {
            if (_assemblies.Contains(assembly)) return this;

            _assemblies.Add(assembly);

            return this;
        }

        public IEnumerable<Assembly> GetAssemblies() => _assemblies.ToArray();
    }
}
