using Moq;
using Xunit;
using Xunit.Categories;
using Microsoft.AspNetCore.Mvc;
using KHost.Abstractions.Models;
using KHost.Abstractions.Providers;
using KHost.App.Areas.Api.Controllers;
using KHost.App.Areas.Api.Models.Responses;

namespace KHost.UnitTests.App.Controllers
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
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyGetSongSearchResultsWhenQueryProvided()
        {
            // Given
            var songSearchResults = GenerateEntities();

            var request = new SongSearchController.SongSearchRequest
            {
                Query = songSearchResults.First().SongName
            };

            var provider = Mock.Of<ISongSearchProvider>();

            _ = Mock.Get(provider).Setup(p => p.SearchAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>()))
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
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyGetSearchEngines()
        {
            // Given
            var engines = new List<SongSearchEngineDetails>
            {
                new ()
                {
                    Name = "Mock Search Engine"
                }
            };

            var provider = Mock.Of<ISongSearchProvider>();

            _ = Mock.Get(provider).Setup(p => p.GetSongSearchEngineDetails())
                .Returns(() => engines);

            var controller = new SongSearchController(provider);

            // When
            var actionResult = await controller.GetSongSearchEngines();

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<SongSearchEngineDetails>>>(okResult.Value);

            Assert.True(apiResponse.Success);

            Assert.True(apiResponse.Result.Any());
        }
    }
}
