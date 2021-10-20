using KHost.App.Controllers.Api;
using KHost.App.Models.Responses;
using KHost.Common.Models;
using KHost.Common.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class QueuedSingersControllerTests : CrudControllerTests<QueuedSinger, IQueuedSingersRepository, QueuedSingersController>
    {
        protected override QueuedSingersController CreateController() => new (Repository);

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
    }
}
