using KHost.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.SongImporters
{
    public class ImportableSong : Song
    {
        public bool Populated { get; set; }
    }
}
