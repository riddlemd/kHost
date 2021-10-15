using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace KHost.Common.Http
{
    public static class HttpRequestExtensions
    {
        private static string[] ApiContentTypes { get; } = new[]
        {
            "application/json",
            "text/json",
            "application/xml",
            "text/xml"
        };

        public static bool IsApiRequest(this HttpRequest request) => ApiContentTypes.Contains(request.ContentType);
    }
}
