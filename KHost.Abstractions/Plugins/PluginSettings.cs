using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Abstractions.Plugins
{
    public class PluginSettings
    {
        public string Name { get; set; } = "Unknown Plugin";

        public string Version { get; set; } = "";

        public string Description { get; set; } = "";
    }
}
