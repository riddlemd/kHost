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
using Xunit.Categories;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class QueuedSingersControllerTests : CrudControllerTests<QueuedSinger, IQueuedSingersRepository, QueuedSingersController>
    {
        protected override QueuedSingersController CreateController(IQueuedSingersRepository repository) => new (repository);

        protected override IEnumerable<QueuedSinger> GenerateEntities()
        {
            for(var i = 0; i < 20; i++)
            {
                yield return new ()
                {
                    Id = i + 1,
                    SingerId = i + 100,
                    Position = i
                };
            }
        }

        protected override QueuedSinger CreateSampleEntity() => new ()
        {
            SingerId = Random.Next(1, 1000),
            QueuedSongsCount = Random.Next(0, 10)
        };

        [Fact]
        [Category("Success")]
        public async Task ShouldSuccessfullyMoveUp()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 5.45f;

            var repository = Mock.Of<IQueuedSingersRepository>();

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
        [Category("Success")]
        public async Task ShouldSuccessfullyMoveDown()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 5.45f;

            var repository = Mock.Of<IQueuedSingersRepository>();

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
        [Category("Success")]
        public async Task ShouldSuccessfullyMoveToTop()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 0f;

            var repository = Mock.Of<IQueuedSingersRepository>();

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
        [Category("Success")]
        public async Task ShouldSuccessfullyMoveToBottom()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 2
            };

            var expectedNewPosition = 100f;

            var repository = Mock.Of<IQueuedSingersRepository>();

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
