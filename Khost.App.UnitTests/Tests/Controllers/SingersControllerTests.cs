using KHost.App.Controllers.Api;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Models;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class SingersControllerTests : CrudControllerTests<Singer, ISingersRepository, SingersController>
    {
        public SingersControllerTests()
        {
            Mock.Setup(x => x.Search(It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns(async (string query, int? count, int? offset) =>
                {
                    var entities = await Repository.Read();

                    if (offset != null)
                        entities.Skip((int)offset);

                    if (count != null)
                        entities.Take((int)count);

                    entities = entities.Where(e => e.Name == query);

                    return entities;
                });
        }

        protected override SingersController CreateController() => new (Repository);

        protected override IEnumerable<Singer> GenerateEntities() => new List<Singer>
        {
            new ()
            {
                Id = 1,
                Name = "John Doe"
            },
            new ()
            {
                Id = 2,
                Name = "David Bowie"
            },
            new ()
            {
                Id = 3,
                Name = "Joe Dirt"
            },
            new ()
            {
                Id = 4,
                Name = "Fredric Cougar"
            },
            new ()
            {
                Id = 5,
                Name = "Richard Van Dike"
            },
        };

        protected override Singer CreateSampleEntity() => new ()
        {
            Name = "Guy Faux",
        };

        [Fact]
        public async Task ShouldSuccessfullyGetSingersWhenIdProvided()
        {
            // Given
            var request = new GenericIdsRequest
            {
                Ids = "1,2"
            };

            // When
            var actionResult = await Controller.GetByIds(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<Singer>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Object.Count() == 2);
        }

        [Fact]
        public async Task ShouldSuccessfullyGetSingersWhenQueryProvided()
        {
            // Given
            var request = new GenericSearchRequest
            {
                Query = "Joe Dirt"
            };

            // When
            var actionResult = await Controller.Search(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<Singer>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Object.Any());
        }
    }
}
