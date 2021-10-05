using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public interface IQueueProvider<TModel>
        where TModel : BaseModel, IModelWithPosition
    {
        public Task<int> MoveDown(int id);
        
        public Task<int> MoveToBottom(int id);

        public Task<int> MoveToTop(int id);
        
        public Task<int> MoveUp(int id);
    }
}
