using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.SongSearchEngines;
using KHost.App.Providers;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Xunit.Categories;

namespace KHost.Common.UnitTests.Tests.Providers
{
    public class DefaultSongSearchProviderTests
    {
        private static IEnumerable<SongSearchResult> GenerateEntities() => new List<SongSearchResult>()
        {
            new ()
            {
                Id = Guid.NewGuid().ToString(),
                SongName = "Spice Up Your Life",
                BandName = "Spice Girls",
                EngineName = "mock"
            },
            new ()
            {
                Id = Guid.NewGuid().ToString(),
                SongName = "Baby One More Time",
                BandName = "Britney Spears",
                EngineName = "mock"
            },
            new ()
            {
                Id = Guid.NewGuid().ToString(),
                SongName = "Slide",
                BandName = "The Goo Goo Dolls",
                EngineName = "mock"
            }

        };

        [Fact]
        [Category(TestCategory.Success)]
        public async Task ShouldSuccessfullySearchWhenQueryProvided()
        {
            // Given
            var entities = GenerateEntities();

            var query = "";
            
            var songSearchEngine = Mock.Of<ISongSearchEngine>();

            var engine = "mock";

            _ = Mock.Get(songSearchEngine).Setup(e => e.Name)
                .Returns(engine);

            _ = Mock.Get(songSearchEngine).Setup(e => e.Search(It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns(Task.FromResult(entities));
            
            var serviceProvider = new ServiceCollection()
                .AddTransient(p => songSearchEngine)
                .BuildServiceProvider();

            var downloadsRepository = Mock.Of<IDownloadsRepository>();
            
            var provider = new DefaultSongSearchProvider(serviceProvider, downloadsRepository);

            // When
            var result = await provider.SearchAsync(query, engine);

            // Then
            Assert.True(result.Count() == entities.Count());
        }

        [Fact]
        [Category(TestCategory.Success)]
        public void ShouldSuccessfullyGetSongSearchEngineDefinitions()
        {
            // Given
            var localSongSearchEngine = Mock.Of<ISongSearchEngine>();

            var mockSongSearchEngine = Mock.Of<ISongSearchEngine>();

            var serviceProvider = new ServiceCollection()
                .AddTransient(p => localSongSearchEngine)
                .AddTransient(p => mockSongSearchEngine)
                .BuildServiceProvider();

            var downloadsRepository = Mock.Of<IDownloadsRepository>();

            var provider = new DefaultSongSearchProvider(serviceProvider, downloadsRepository);

            // When
            var result = provider.GetSongSearchEngineDetails();

            // Then
            Assert.True(result.Count() == 2);
        }

        [Fact]
        [Category(TestCategory.Success)]
        public async Task ShouldSuccessfullyCreateSong()
        {
            // Given
            var songSearchResultId = "1";

            var songToReturn = new Song
            {
                Id = 1,
                Name = "Dance Commander",
                BandName = "Electric Six"
            };

            var songSearchEngine = Mock.Of<ISongSearchEngine>();

            var engine = "mock";

            _ = Mock.Get(songSearchEngine).Setup(e => e.Name)
                .Returns(engine);

            _ = Mock.Get(songSearchEngine).Setup(e => e.GetSong(It.IsAny<string>()))
                .Returns((string id) => Task.FromResult(songToReturn));

            var serviceProvider = new ServiceCollection()
                .AddTransient(p => songSearchEngine)
                .BuildServiceProvider();

            var downloadsRepository = Mock.Of<IDownloadsRepository>();

            var provider = new DefaultSongSearchProvider(serviceProvider, downloadsRepository);

            // When
            var song = await provider.GetSongAsync(songSearchResultId, engine);

            // Then
            Assert.True(song == songToReturn);
        }

        [Fact]
        [Category(TestCategory.Success)]
        public async Task ShouldSuccessfullyStartDownloadingSong()
        {
            // Given
            var songSearchResultId = "1";

            var downloadToReturn = new Download
            {
                Id = 1,
                Name = "Dance Commander - Electric Six",
                SongId = 1
            };

            var songSearchEngine = Mock.Of<ISongSearchEngine>();

            var engine = "mock";

            _ = Mock.Get(songSearchEngine).Setup(e => e.Name)
                .Returns(engine);

            _ = Mock.Get(songSearchEngine).Setup(e => e.DownloadSong(It.IsAny<string>(), It.IsAny<int>()))
                .Returns((string id, int songId) => Task.FromResult(downloadToReturn));

            var serviceProvider = new ServiceCollection()
                .AddTransient(p => songSearchEngine)
                .BuildServiceProvider();

            var downloadsRepository = Mock.Of<IDownloadsRepository>();

            var provider = new DefaultSongSearchProvider(serviceProvider, downloadsRepository);

            // When
            var download = await provider.DownloadSongAsync(songSearchResultId, engine, 1);

            // Then
            Assert.True(download == downloadToReturn);
        }
    }
}
