using System;
using System.Net;

namespace KHost.Abstractions.ErrorHandling
{
    public class KHostException : Exception
    {
        public HttpStatusCode HttpStatusCode { get; }

        public KHostException(string? message = null, Exception? innerException = null, HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError) : base(message, innerException)
        {
            HttpStatusCode = httpStatusCode;
        }

        protected static string FormatMessage(string baseMessage, string message) => baseMessage + (!string.IsNullOrWhiteSpace(message) ? $": {message}" : null);
    }
}
