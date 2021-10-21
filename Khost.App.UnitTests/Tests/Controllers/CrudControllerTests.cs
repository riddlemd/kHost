using KHost.App.Controllers.Api;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Models;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Categories;

namespace Khost.App.UnitTests.Tests.Controllers
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
        [Category("Success")]
        public virtual async Task<ApiResponse> ShouldSuccessfullyCreateEntity()
        {
            // Given
            var request = CreateSampleEntity();
            
            var repository = Mock.Of<TRepository>();
            
            Mock.Get(repository).Setup(r => r.Create(It.IsAny<TModel>()))
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
        [Category("Success")]
        public virtual async Task<ApiResponse> ShouldSuccessfullyReadEntities()
        {
            // Given
            var request = new GenericPaginatedRequest();

            var repository = Mock.Of<TRepository>();
            
            Mock.Get(repository).Setup(r => r.Read(It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns((int? count, int? offset) => Task.FromResult(GenerateEntities()));
            
            var controller = CreateController(repository);

            // When
            var actionResult = await controller.Read(request);

            // Then
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<TModel>>>(okResult.Value);
            
            Assert.True(apiResponse.Success);
            
            Assert.True(apiResponse.Result.Count() > 0);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        [Category("Success")]
        public virtual async Task<ApiResponse> ShouldSuccessfullyUpdateEntity()
        {
            // Given
            var request = CreateSampleEntity();

            var repository = Mock.Of<TRepository>();

            Mock.Get(repository).Setup(r => r.Update(It.IsAny<TModel>()))
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
        [Category("Success")]
        public virtual async Task<ApiResponse> ShouldSuccessfullyDeleteEntity()
        {
            // Given
            var request = new GenericIdRequest
            {
                Id = 1
            };

            var repository = Mock.Of<TRepository>();

            Mock.Get(repository).Setup(r => r.DeleteById(It.IsAny<int>()))
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
