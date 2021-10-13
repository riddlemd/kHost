﻿using KHost.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface ISongsRepository : IRepository<Song>, ISearchableRepository<Song>
    {
        
    }
}