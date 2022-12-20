using System.Collections.Generic;
using System.Reflection;

namespace KHost.Abstractions.Plugins
{
    public interface IPlugin
    {
        string Path { get; }
        IPlugin RegisterAssembly(Assembly assembly);
        IEnumerable<Assembly> GetAssemblies();
    }
}
