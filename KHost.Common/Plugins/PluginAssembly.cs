using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Plugins
{
    public class PluginAssembly : IPluginAssembly
    {
        public string Path { get; }

        public Assembly Assembly { get; }

        public PluginAssembly(string path, Assembly assembly)
        {
            Path = path;
            Assembly = assembly;
        }
    }
}
