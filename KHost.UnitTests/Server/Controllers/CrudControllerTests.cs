using KHost.Abstractions.Models;
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
    public abstract class CrudControllerTests<TModel, TRepository, TController>
        where TModel : BaseModel, IModelWithId, new()
        where TRepository : class, IRepository<TModel>
        where TController : CrudController<TModel, TRepository>
    {
        protected Random Random { get; } = new Random();

        public CrudControllerTests()
        {

        }

        [SkippableFact(typeof(NotSupportedException))]
        [Category(TestCategory.HappyPath)]
        public virtual async Task<ApiResponse> ShouldSuccessfullyCreateEntity()
        {
            // Given
            var request = CreateSampleEntity();

            var repository = Mock.Of<TRepository>();

            _ = Mock.Get(repository).Setup(r => r.CreateAsync(It.IsAny<TModel>()))
                .Returns((TModel entity) => Task.FromResult(entity));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Create(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<TModel>>(okResult.Value);

            Assert.True(apiResponse.Success);

            Assert.NotNull(apiResponse.Result);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        [Category(TestCategory.HappyPath)]
        public virtual async Task<ApiResponse> ShouldSuccessfullyReadEntities()
        {
            // Given
            var request = new GenericPaginatedRequest();

            var repository = Mock.Of<TRepository>();

            _ = Mock.Get(repository).Setup(r => r.FetchAsync(It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns((int? count, int? offset) => Task.FromResult(GenerateEntities()));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Fetch(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<TModel>>>(okResult.Value);

            Assert.True(apiResponse.Success);

            Assert.True(apiResponse.Result.Count() > 0);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        [Category(TestCategory.HappyPath)]
        public virtual async Task<ApiResponse> ShouldSuccessfullyUpdateEntity()
        {
            // Given
            var request = CreateSampleEntity();

            var repository = Mock.Of<TRepository>();

            _ = Mock.Get(repository).Setup(r => r.UpdateAsync(It.IsAny<TModel>()))
                .Returns((TModel entity) => Task.FromResult(true));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Update(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);

            Assert.True(apiResponse.Success);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        [Category(TestCategory.HappyPath)]
        public virtual async Task<ApiResponse> ShouldSuccessfullyDeleteEntity()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 1
            };

            var repository = Mock.Of<TRepository>();

            _ = Mock.Get(repository).Setup(r => r.DeleteByIdAsync(It.IsAny<int>()))
                .Returns((int id) => Task.FromResult(true));

            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Delete(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);

            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);

            Assert.True(apiResponse.Success);

            return apiResponse;
        }

        #region Mock Handlers

        protected abstract TController CreateController(TRepository repository);

        protected abstract TModel CreateSampleEntity();

        protected abstract IEnumerable<TModel> GenerateEntities();

        #endregion
    }
}
