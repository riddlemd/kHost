using KHost.App.Controllers.Api;
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
    public class UsersControllerTests : CrudControllerTests<User, IUsersRepository, UsersController>
    {
        protected override UsersController CreateController(IUsersRepository repository) => new(repository);

        protected override IEnumerable<User> GenerateEntities() => new List<User>
        {
            new ()
            {
                Id = 1,
                Username = "roger"
            },
            new ()
            {
                Id = 2,
                Username = "steve"
            },
            new ()
            {
                Id = 3,
                Username = "eric"
            },
            new ()
            {
                Id = 4,
                Username = "bill"
            },
            new ()
            {
                Id = 5,
                Username = "sami"
            },
        };

        protected override User CreateSampleEntity() => new()
        {
            Username = "Bowser"
        };

        [Fact]
        [Category("Success")]
        public virtual async Task ShouldSuccessfullyLogin()
        {
            // Given
            var request = new UsersController.LoginRequest
            {
                Username = "Tom",
                Password = "Blink182"
            };

            var repository = Mock.Of<IUsersRepository>();

            _ = Mock.Get(repository).Setup(r => r.Create(It.IsAny<UsersController.LoginRequest>()))
                .Returns((UsersController.LoginRequest request) => Task.FromResult(new User { Username = request.Username }));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Login(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<User>>(okResult.Value);

            Assert.True(apiResponse.Success);

            Assert.NotNull(apiResponse.Result);
        }
    }
}
