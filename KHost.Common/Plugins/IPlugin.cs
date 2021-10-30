using System.Collections.Generic;
using System.Reflection;

namespace KHost.Common.Plugins
{
    public interface IPlugin
    {
        string Path { get; }

        IPlugin RegisterAssembly(Assembly assembly);

        IEnumerable<Assembly> GetAssemblies();
    }
}
