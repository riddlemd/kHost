﻿using KHost.Abstractions.Models;
using KHost.Abstractions.SongImporters;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Abstractions.Providers
{
    public interface ISongImporterProvider
    {
        Task<IEnumerable<ImportableSong>> FindAsync(string path, string importerName);
        Task<ImportableSong> GetDetailsAsync(string path, string importerName);
        Task<Song> ImportAsync(string path, string importerName);
    }
}
