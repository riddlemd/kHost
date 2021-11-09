using KHost.Common.SongImporters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using KHost.Common.Models;

namespace KHost.Common.Providers
{
    public class DefaultSongImporterProvider : ISongImporterProvider
    {
        private readonly ISongImporter[] _importers;

        public DefaultSongImporterProvider(IServiceProvider services)
        {
            _importers = services.GetServices<ISongImporter>().ToArray();
        }

        public Task<IEnumerable<ImportableSong>> Find(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.Find(path);
        }

        public Task<ImportableSong> GetDetails(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.GetDetails(path);
        }

        public Task<Song> Import(string path, string importerName)
        {
            var importer = GetImporterByName(importerName);

            return importer.Import(path);
        }

        private ISongImporter GetImporterByName(string name)
        {
            foreach(var importer in _importers)
            {
                if (importer.Name == name) return importer;
            }

            throw new Exception($"Song Importer '{name}' could not be found");
        }
    }
}
