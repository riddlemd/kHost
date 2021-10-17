﻿using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public class InMemoryEFRepository<TModel> : BaseEFRepository<TModel>
        where TModel : class, IModelWithId
    {

        public InMemoryEFRepository(MemoryContext memoryContext) : base(memoryContext)
        {

        }
    }
}
