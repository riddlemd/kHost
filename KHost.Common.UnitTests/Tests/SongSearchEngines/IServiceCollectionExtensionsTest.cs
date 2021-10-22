using KHost.Common.Reflection;
using KHost.Common.SongSearchEngines;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Categories;

namespace KHost.Common.UnitTests.Tests.SongSearchEngines
{
    public class IServiceCollectionExtensionsTest
    {

        [Fact]
        [Category(TestCategory.Success)]
        public void ShouldAddSearchEnginesFoundInAssymbliesToServiceCollection()
        {
            // Given
            var services = new ServiceCollection();

            var type = typeof(ISongSearchEngine);

            // When
            services.AddSearchEnginesDynamically();

            // Then
            Assert.Contains(services, d => d.ServiceType == type);
        }
    }
}
