using Khost.Common.Web.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KHost.UnitTests.Common.Web.Routing
{
    public class DashedParameterTransformerTests
    {
        [Fact]
        public void ShouldTransformOutboundWhenProvidedObject()
        {
            // Given
            var pascalName = "FindUserById";

            var transformer = new DashedParameterTransformer();

            // When
            var dashedName = transformer.TransformOutbound(pascalName);

            // Then
            Assert.True(dashedName == "find-user-by-id");
        }
    }
}
