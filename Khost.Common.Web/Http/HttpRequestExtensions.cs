using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Khost.Common.Web.Http
{
    public static class HttpRequestExtensions
    {
        private static readonly string[] _apiContentTypes = new[]
        {
            "application/json",
            "text/json",
            "application/xml",
            "text/xml"
        };

        public static bool IsApiRequest(this HttpRequest request) => _apiContentTypes.Contains(request.ContentType);
    }
}
