using KHost.Abstractions.Plugins;
using System.Collections.Generic;
using System.Reflection;

namespace KHost.App.Plugins
{
    public class GenericPlugin : IPlugin
    {
        public string Path { get; }

        public PluginSettings Settings { get; }

        protected List<Assembly> _assemblies = new();

        public GenericPlugin(PluginSettings settings, string path)
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
