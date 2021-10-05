using KHost.App.ErrorHandling;
using System;
using System.Net;
using System.Runtime.Serialization;

namespace KHost.App.Repositories.SQLite
{
    public class FailedToUpdateRecordException : KHostException
    {
        public FailedToUpdateRecordException(string message = null, Exception innerException = null) : base(FormatMessage("Failed To Update Record", message), innerException, HttpStatusCode.BadRequest)
        {
            
        }
    }
}
