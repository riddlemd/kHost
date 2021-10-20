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

namespace Khost.App.UnitTests.Tests.Controllers
{
    public abstract class CrudControllerTests<TModel, TRepository, TController>
        where TModel : BaseModel, IModelWithId, new()
        where TRepository : class, IRepository<TModel>
        where TController : CrudController<TModel, TRepository>
    {
        protected TController Controller { get; init; }

        protected TRepository Repository { get; init; }

        protected Mock<TRepository> Mock { get; }

        protected Dictionary<int, string> Entities { get; }

        protected Random Random { get; } = new Random();

        public CrudControllerTests()
        {
            Entities = GenerateEntities()
                .Where(e => e != null)
                .ToDictionary(e => (int)e.Id, e => JsonConvert.SerializeObject(e));

            Mock = new Mock<TRepository>();

            Mock.Setup(x => x.Create(It.IsAny<Download>()))
                .Returns((TModel entity) => MockCreateHandler(entity));

            Mock.Setup(x => x.Read(It.IsAny<int?>(), It.IsAny<int?>()))
                .Returns((int? count, int? offset) => MockReadHandler(count, offset));

            Mock.Setup(x => x.Update(It.IsAny<Download>()))
                .Returns((TModel entity) => MockUpdateHandler(entity));

            Mock.Setup(x => x.Delete(It.IsAny<Download>()))
                .Returns((TModel entity) => MockDeleteHandler(entity));

            Mock.Setup(x => x.DeleteById(It.IsAny<int>()))
                .Returns((int id) => MockDeleteByIdHandler(id));

            Mock.Setup(x => x.GetById(It.IsAny<int>()))
                .Returns((int id) => MockGetByIdHandler(id));

            Repository = Mock.Object;

            Controller = CreateController();
        }

        [SkippableFact(typeof(NotSupportedException))]
        public virtual async Task<ApiResponse> WhenNewEnityCreatedReturnsEntity()
        {
            // Arrange
            var request = CreateSampleEntity();

            // Act
            var actionResult = await Controller.Create(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<TModel>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.NotNull(apiResponse.Object);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        public virtual async Task<ApiResponse> WhenReadNoCountNoOffsetReturnsEntities()
        {
            // Arrange
            var request = new GenericPaginatedRequest();

            // Act
            var actionResult = await Controller.Read(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse<IEnumerable<TModel>>>(okResult.Value);
            Assert.True(apiResponse.Success);
            Assert.True(apiResponse.Object.Count() > 0);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        public virtual async Task<ApiResponse> WhenEntityUpdatedReturnsSuccessTrue()
        {
            // Arrange
            var request = CreateSampleEntity();

            // Act
            var actionResult = await Controller.Update(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);

            return apiResponse;
        }

        [SkippableFact(typeof(NotSupportedException))]
        public virtual async Task<ApiResponse> WhenEntityDeletedReturnsSuccessTrue()
        {
            // Arrange
            var request = new GenericIdRequest
            {
                Id = 1
            };

            // Act
            var actionResult = await Controller.Delete(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.True(apiResponse.Success);

            return apiResponse;
        }

        #region Mock Handlers

        protected abstract TController CreateController();

        protected abstract TModel CreateSampleEntity();

        protected abstract IEnumerable<TModel> GenerateEntities();

        protected async virtual Task<TModel> MockCreateHandler(TModel entity)
        {
            if (entity.Id != null) throw new Exception("Entity can not have Id");

            var newEntity = entity.Clone() as TModel;
            newEntity.Id = Entities.Max(e => e.Key) + 1;

            if (newEntity is IModelWithPosition newEntityWithPosition)
                newEntityWithPosition.Position = (await MockReadHandler()).Max(e => (e as IModelWithPosition).Position) + 1;

            Entities.Add((int)newEntity.Id, JsonConvert.SerializeObject(newEntity));

            return newEntity;
        }

        protected virtual Task<IEnumerable<TModel>> MockReadHandler(int? count = null, int? offset = null)
        {
            IEnumerable<string> entities = Entities.Values;

            if (offset != null)
                entities.Skip((int)offset);

            if (count != null)
                entities.Take((int)count);

            return Task.FromResult(entities.Select(e => JsonConvert.DeserializeObject<TModel>(e)));
        }

        protected virtual Task<bool> MockUpdateHandler(TModel entity)
        {
            if (entity?.Id == null) return Task.FromResult(false);

            if (Entities.ContainsKey((int)entity.Id)) return Task.FromResult(false);

            Entities[(int)entity.Id] = JsonConvert.SerializeObject(entity);

            return Task.FromResult(true);
        }

        protected async virtual Task<bool> MockDeleteByIdHandler(int id)
        {
            var entity = await MockGetByIdHandler(id);

            return await MockDeleteHandler(entity);
        }

        protected virtual Task<bool> MockDeleteHandler(TModel entity)
        {
            if (entity?.Id == null) return Task.FromResult(false);

            return Task.FromResult(Entities.Remove((int)entity.Id));
        }

        protected virtual Task<TModel> MockGetByIdHandler(int id) => Task.FromResult(Entities.ContainsKey(id) ? JsonConvert.DeserializeObject<TModel>(Entities[id]) : null);

        #endregion
    }
}
