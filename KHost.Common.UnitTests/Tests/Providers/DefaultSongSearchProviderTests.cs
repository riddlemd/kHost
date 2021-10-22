using KHost.Common.Models;
using KHost.Common.Providers;
using KHost.Common.Repositories;
using KHost.Common.SongSearchEngines;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            var engine = songSearchEngine.GetType().Name;
            
            _ = Mock.Get(songSearchEngine).Setup(e => e.Search(It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>())).Returns(Task.FromResult(entities));
            
            var serviceProvider = new ServiceCollection()
                .AddSingleton(p => songSearchEngine)
                .BuildServiceProvider();
            
            var provider = new DefaultSongSearchProvider(serviceProvider);

            // When
            var result = await provider.Search(query, engine);

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
                .AddSingleton(p => localSongSearchEngine)
                .AddSingleton(p => mockSongSearchEngine)
                .BuildServiceProvider();
            
            var provider = new DefaultSongSearchProvider(serviceProvider);

            // When
            var result = provider.GetSongSearchEngineDetails();

            // Then
            Assert.True(result.Count() == 2);
        }
    }
}
