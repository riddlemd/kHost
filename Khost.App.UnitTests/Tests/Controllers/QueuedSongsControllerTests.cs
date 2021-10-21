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
    public class QueuedSongsControllerTests : CrudControllerTests<QueuedSong, IQueuedSongsRepository, QueuedSongsController>
    {
        protected override QueuedSongsController CreateController(IQueuedSongsRepository repository) => new(repository);

        protected override IEnumerable<QueuedSong> GenerateEntities()
        {
            for(var i = 0; i < 10; i++)
            {
                for (var c = 0; c < Random.Next(0, 10); c++)
                {
                    yield return new QueuedSong
                    {
                        Id = i + c + 1,
                        QueuedSingerId = i + 1,
                        SongId = i + 100,
                        Position = i + c,
                    };
                }
            }
        }

        protected override QueuedSong CreateSampleEntity() => new ()
        {
            QueuedSingerId = Random.Next(1, 1000),
            SongId = Random.Next(1, 1000),
        };

        [Fact]
        public async Task ShouldSuccessfullyGetQueuedSongsWhenQueuedSingerIdProvided()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var repository = Mock.Of<IQueuedSongsRepository>();

            Mock.Get(repository).Setup(r => r.GetByQueuedSingerId(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(GenerateEntities().Where(e => e.QueuedSingerId == request.Id)));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.GetByQueuedSingerId(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<QueuedSong>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Result.Any());
        }

        [Fact]
        public async Task ShouldSuccessfullyMoveUp()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 5.45f;

            var repository = Mock.Of<IQueuedSongsRepository>();

            Mock.Get(repository).Setup(r => r.MoveUp(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveUp(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);
        }

        [Fact]
        public async Task ShouldSuccessfullyMoveDown()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 5.45f;

            var repository = Mock.Of<IQueuedSongsRepository>();

            Mock.Get(repository).Setup(r => r.MoveDown(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveDown(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);
        }

        [Fact]
        public async Task ShouldSuccessfullyMoveToTop()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 0f;

            var repository = Mock.Of<IQueuedSongsRepository>();

            Mock.Get(repository).Setup(r => r.MoveToTop(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveToTop(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);
        }

        [Fact]
        public async Task ShouldSuccessfullyMoveToBottom()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 100f;

            var repository = Mock.Of<IQueuedSongsRepository>();

            Mock.Get(repository).Setup(r => r.MoveUp(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(expectedNewPosition));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.MoveToBottom(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);
        }
    }
}
