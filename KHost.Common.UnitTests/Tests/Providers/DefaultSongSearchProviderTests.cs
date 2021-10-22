using KHost.Common.Models;
using KHost.Common.Providers;
using KHost.Common.Repositories;
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
        protected IEnumerable<SongSearchResult> GenerateEntities() => new List<SongSearchResult>()
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
        [Category("Success")]
        public async Task ShouldSuccessfullySearchWhenQueryProvided()
        {
            // Given
            var entities = GenerateEntities();

            var query = "";

            var engine = "ISongSearchRepositoryProxy";
            
            var songSearchRepository = Mock.Of<ISongSearchRepository>();
            
            _ = Mock.Get(songSearchRepository).Setup(r => r.Search(It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>())).Returns(Task.FromResult(entities));
            
            var serviceProvider = new ServiceCollection()
                .AddSingleton(p => songSearchRepository)
                .BuildServiceProvider();
            
            var provider = new DefaultSongSearchProvider(serviceProvider);

            // When
            var result = await provider.Search(query, engine);

            // Then
            Assert.True(result.Count() == entities.Count());
        }

        [Fact]
        [Category("Success")]
        public async Task ShouldSuccessfullyGetSongSearchEngineDefinitions()
        {
            // Given
            var localSongSearchRepository = Mock.Of<ISongSearchRepository>();

            var mockSongSearchRepository = Mock.Of<ISongSearchRepository>();

            var serviceProvider = new ServiceCollection()
                .AddSingleton(p => localSongSearchRepository)
                .AddSingleton(p => mockSongSearchRepository)
                .BuildServiceProvider();
            
            var provider = new DefaultSongSearchProvider(serviceProvider);

            // When
            var result = provider.GetSongSearchEngineDefinitions();

            // Then
            Assert.True(result.Count() == 2);
        }
    }
}
