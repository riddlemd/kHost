﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public class User : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Username { get; set; }

        public string AccessKey { get; set; }
    }
}