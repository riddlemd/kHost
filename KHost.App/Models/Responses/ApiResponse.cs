using KHost.Common.Text;
using System;
using System.Collections;
using System.Linq;
using System.Runtime.Serialization;

namespace KHost.App.Models.Responses
{
    [Serializable]
    public class ApiResponse
    {
        public bool Success { get; set; } = true;
    }

    [Serializable]
    public class ApiResponse<TModel> : ApiResponse
        where TModel : class
    {
        public TModel Result { get; }

        public ApiResponse(TModel obj)
        {
            Result = obj;
        }
    }
}
