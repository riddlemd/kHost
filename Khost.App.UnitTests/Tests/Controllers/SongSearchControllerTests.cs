using KHost.App.Controllers.Api;
using KHost.Common.Providers;
using KHost.Common.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Categories;
using Microsoft.AspNetCore.Mvc;
using KHost.App.Models.Responses;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class SongSearchControllerTests
    {
        public IEnumerable<SongSearchResult> GenerateEntities() => new List<SongSearchResult>()
        {
            new ()
            { 
                Id = Guid.NewGuid().ToString(),
                SongName = "Spice Up Your Life",
                BandName = "Spice Girls",
                EngineName = "Mock"
            },
            new ()
            {
                Id = Guid.NewGuid().ToString(),
                SongName = "Baby One More Time",
                BandName = "Britney Spears",
                EngineName = "Mock"
            },
            new ()
            {
                Id = Guid.NewGuid().ToString(),
                SongName = "Slide",
                BandName = "The Goo Goo Dolls",
                EngineName = "Mock"
            }

        };

        [Fact]
        [Category("Success")]
        public async Task ShouldSuccessfullyGetSongSearchResultsWhenQueryProvided()
        {
            // Given
            var songSearchResults = GenerateEntities();
            
            var request = new SongSearchController.SongSearchRequest
            {
                Query = songSearchResults.First().SongName
            };

            var provider = Mock.Of<ISongSearchProvider>();

            _ = Mock.Get(provider).Setup(p => p.Search(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns((string query, string engine, int? count, int? offset) => Task.FromResult(songSearchResults));

            var controller = new SongSearchController(provider);

            // When
            var actionResult = await controller.Search(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<SongSearchResult>>>(okResult.Value);
            
            Assert.True(apiResponse.Success);
            
            Assert.True(apiResponse.Result.Any());
        }

        [Fact]
        [Category("Success")]
        public async Task ShouldSuccessfullyGetSearchEngines()
        {
            // Given
            var engines = new List<SongSearchEngine>
            {
                new ()
                {
                    Name = "Mock Search Engine"
                }
            };

            var provider = Mock.Of<ISongSearchProvider>();

            _ = Mock.Get(provider).Setup(p => p.GetSongSearchEngineDefinitions())
                .Returns(() => engines);

            var controller = new SongSearchController(provider);

            // When
            var actionResult = await controller.GetSongSearchEngines();

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<SongSearchEngine>>>(okResult.Value);
            
            Assert.True(apiResponse.Success);
            
            Assert.True(apiResponse.Result.Any());
        }
    }
}
