﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using KHost.Abstractions.Providers;
using KHost.Abstractions.SongImporters;
using KHost.Abstractions.Models;

namespace KHost.App.Providers
{
    internal class DefaultSongImporterProvider : ISongImporterProvider
    {
        private readonly ISongImporter[] _importers;

        public DefaultSongImporterProvider(IServiceProvider services)
        {
            _importers = services.GetServices<ISongImporter>().ToArray();
        }

        public Task<IEnumerable<ImportableSong>> FindAsync(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.FindAsync(path);
        }

        public Task<ImportableSong> GetDetailsAsync(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.GetDetailsAsync(path);
        }

        public Task<Song> ImportAsync(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.ImportAsync(path);
        }

        private ISongImporter GetImporterByName(string name)
        {
            foreach (var importer in _importers)
            {
                if (importer.Name == name) return importer;
            }

            throw new Exception($"Song Importer '{name}' could not be found");
        }
    }
}
