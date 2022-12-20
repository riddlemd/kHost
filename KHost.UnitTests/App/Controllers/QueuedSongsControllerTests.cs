using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.App.Areas.Api.Controllers;
using KHost.App.Areas.Api.Models.Requests;
using KHost.App.Areas.Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Xunit.Categories;

namespace KHost.UnitTests.App.Controllers
{
    public class QueuedSongsControllerTests : CrudControllerTests<QueuedSong, IQueuedSongsRepository, QueuedSongsController>
    {
        protected override QueuedSongsController CreateController(IQueuedSongsRepository repository) => new(repository);

        protected override IEnumerable<QueuedSong> GenerateEntities()
        {
            for (var i = 0; i < 10; i++)
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

        protected override QueuedSong CreateSampleEntity() => new()
        {
            QueuedSingerId = Random.Next(1, 1000),
            SongId = Random.Next(1, 1000),
        };

        [Fact]
        [Category(TestCategory.HappyPath)]
        public async Task ShouldSuccessfullyFindQueuedSongsWhenQueuedSingerIdProvided()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var repository = Mock.Of<IQueuedSongsRepository>();

            _ = Mock.Get(repository).Setup(r => r.FindByQueuedSingerIdAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(GenerateEntities().Where(e => e.QueuedSingerId == request.Id)));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.FindByQueuedSingerId(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<QueuedSong>>>(okResult.Value);

            Assert.True(apiResponse.Success);

            Assert.NotNull(apiResponse.Result);
        }

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

            var repository = Mock.Of<IQueuedSongsRepository>();

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

            var repository = Mock.Of<IQueuedSongsRepository>();

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

            var repository = Mock.Of<IQueuedSongsRepository>();

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

            var repository = Mock.Of<IQueuedSongsRepository>();

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
