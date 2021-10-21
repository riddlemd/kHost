using KHost.App.Controllers.Api;
using KHost.Common.Models;
using KHost.Common.Repositories;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class DownloadsControllerTests : CrudControllerTests<Download, IDownloadsRepository, DownloadsController>
    {
        protected override DownloadsController CreateController(IDownloadsRepository repository) => new (repository);

        protected override IEnumerable<Download> GenerateEntities() => new List<Download>
        {
            new ()
            {
                Id = 1,
                Name = "Christmas Song - Johnny Cash",
                SongId = 1,
                Progress = 10
            },
            new ()
            {
                Id = 2,
                Name = "Highway To the Danger Zone - Kenny Logins",
                SongId = 2,
                Progress = 50
            }
        };

        protected override Download CreateSampleEntity() => new ()
        {
            Name = "Test Download",
            Progress = Random.Next(0, 100),
            SongId = Random.Next(1, 1000)
        };
    }
}
