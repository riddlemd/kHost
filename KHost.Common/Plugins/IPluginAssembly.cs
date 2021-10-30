using System.Reflection;

namespace KHost.Common.Plugins
{
    public interface IPluginAssembly
    {
        string Path { get; }

        Assembly Assembly { get; }
    }
}
