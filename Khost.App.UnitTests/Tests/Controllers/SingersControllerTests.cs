﻿using KHost.App.Controllers.Api;
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
        protected override SingersController CreateController(ISingersRepository repository) => new (repository);

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

            var repository = Mock.Of<ISingersRepository>();

            Mock.Get(repository).Setup(r => r.GetByIds(It.IsAny<IEnumerable<int>>()))
                .Returns((IEnumerable<int> ids) => Task.FromResult(Entities.Where(e => ids.Contains((int)e.Id))));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.GetByIds(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<Singer>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Result.Count() == 2);
        }

        [Fact]
        public async Task ShouldSuccessfullyGetSingersWhenQueryProvided()
        {
            // Given
            var request = new GenericSearchRequest
            {
                Query = "Joe Dirt"
            };

            var repository = Mock.Of<ISingersRepository>();

            Mock.Get(repository).Setup(r => r.Search(It.IsAny<string>(), It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns((string query, int? count, int? offset) => Task.FromResult(Entities));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Search(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<Singer>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Result.Any());
        }
    }
}
