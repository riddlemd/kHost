using KHost.Common.Text;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Linq;
using System.Runtime.Serialization;

namespace KHost.App.Areas.Api.Models.Responses
{
    [Serializable]
    public class ApiResponse
    {
        public bool Success { get; set; } = true;

        public override string ToString() => JsonConvert.SerializeObject(this);
    }

    [Serializable]
    public class ApiResponse<TModel> : ApiResponse
    {
        public TModel Result { get; }

        public ApiResponse(TModel obj)
        {
            Result = obj;
        }
    }
}
