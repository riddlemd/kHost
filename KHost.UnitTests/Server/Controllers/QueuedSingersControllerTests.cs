﻿using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.Server.Controllers;
using KHost.Server.Models.Requests;
using KHost.Server.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Xunit.Categories;

namespace KHost.UnitTests.Server.Controllers
{
    public class QueuedSingersControllerTests : CrudControllerTests<QueuedSinger, IQueuedSingersRepository, QueuedSingersController>
    {
        protected override QueuedSingersController CreateController(IQueuedSingersRepository repository) => new(repository);

        protected override IEnumerable<QueuedSinger> GenerateEntities()
        {
            for (var i = 0; i < 20; i++)
            {
                yield return new()
                {
                    Id = i + 1,
                    SingerId = i + 100,
                    Position = i
                };
            }
        }

        protected override QueuedSinger CreateSampleEntity() => new()
        {
            SingerId = Random.Next(1, 1000),
            QueuedSongsCount = Random.Next(0, 10)
        };

        [Fact]
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyMoveUp()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 1;

            var repository = Mock.Of<IQueuedSingersRepository>();

            _ = Mock.Get(repository).Setup(r => r.MoveUpAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveUp(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<int>>(okResult.Value);

            Assert.True(apiResponse.Success);
        }

        [Fact]
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyMoveDown()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 1;

            var repository = Mock.Of<IQueuedSingersRepository>();

            _ = Mock.Get(repository).Setup(r => r.MoveDownAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveDown(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<int>>(okResult.Value);

            Assert.True(apiResponse.Success);
        }

        [Fact]
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyMoveToTop()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 0;

            var repository = Mock.Of<IQueuedSingersRepository>();

            _ = Mock.Get(repository).Setup(r => r.MoveToTopAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveToTop(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<int>>(okResult.Value);

            Assert.True(apiResponse.Success);
        }

        [Fact]
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyMoveToBottom()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 100;

            var repository = Mock.Of<IQueuedSingersRepository>();

            _ = Mock.Get(repository).Setup(r => r.MoveUpAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveToBottom(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<int>>(okResult.Value);

            Assert.True(apiResponse.Success);
        }
    }
}
