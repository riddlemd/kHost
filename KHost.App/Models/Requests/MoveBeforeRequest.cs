﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models.Requests
{
    public class MoveBeforeRequest : GenericIdRequest
    {
        public int BeforeId { get; set; }
    }
}