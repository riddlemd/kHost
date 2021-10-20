using KHost.App.Controllers.Api;
using KHost.Common.Models;
using KHost.Common.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class QueuedSongsControllerTests : CrudControllerTests<QueuedSong, IQueuedSongsRepository, QueuedSongsController>
    {
        protected override QueuedSongsController CreateController() => new(Repository);

        protected override IEnumerable<QueuedSong> GenerateEntities()
        {
            for(var i = 0; i < 10; i++)
            {
                yield return new QueuedSong
                {
                    Id = i + 1,
                    QueuedSingerId = i + 100,
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
    }
}
