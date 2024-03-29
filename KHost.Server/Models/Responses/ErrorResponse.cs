﻿using Newtonsoft.Json;
using System;

namespace KHost.Server.Models.Responses
{
    public class ErrorResponse : ApiResponse
    {
        public string Message { get; set; } = "";

        public ErrorResponse(Exception? ex = null)
        {
            Success = false;

            if (ex != null)
                Message = ex.Message;
        }
    }
}
