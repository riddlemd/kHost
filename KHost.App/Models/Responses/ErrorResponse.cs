using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models.Responses
{
    public class ErrorResponse
    {
        public string Message { get; set; }

        public ErrorResponse(Exception ex = null)
        {
            if(ex != null)
            {
                Message = ex.Message;
            }
        }

        public override string ToString() => JsonConvert.SerializeObject(this);
    }
}
