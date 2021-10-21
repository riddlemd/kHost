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
        public QueuedSongsControllerTests()
        {
            Mock.Setup(x => x.GetByQueuedSingerId(It.IsAny<int>()))
                .Returns(async (int id) => (await Repository.Read()).Where(qs => qs.QueuedSingerId == id));
        }

        protected override QueuedSongsController CreateController() => new(Repository);

        protected override IEnumerable<QueuedSong> GenerateEntities()
        {
            for(var i = 0; i < 10; i++)
            {
                yield return new QueuedSong
                {
                    Id = i + 1,
                    QueuedSingerId = i + 1,
                    SongId = i + 100,
                    Position = i,
                };
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

            // When
            var actionResult = await Controller.GetByQueuedSingerId(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<QueuedSong>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Object.Any());
        }

        [Fact]
        public async Task ShouldSuccessfullyMoveUp()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            // When
            var actionResult = await Controller.MoveUp(request);

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

            // When
            var actionResult = await Controller.MoveDown(request);

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

            // When
            var actionResult = await Controller.MoveToTop(request);

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

            // When
            var actionResult = await Controller.MoveToBottom(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);
        }
    }
}
