﻿using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public class QueuedSingersProvider : ProviderWithRepository<QueuedSinger, IQueuedSingersRepository>, IQueueProvider<QueuedSinger>
    {
        public QueuedSingersProvider(IQueuedSingersRepository defaultRepository) : base(defaultRepository)
        {

        }

        public async Task<IEnumerable<QueuedSinger>> Get(int count = 20, int offset = 0) => await DefaultRepository?.Get(count, offset);

        public async Task<(bool, int?)> Save(QueuedSinger model) => await DefaultRepository?.Save(model);

        public async Task<IEnumerable<QueuedSinger>> Search(string query, int count = 20, int offset = 0) => await DefaultRepository?.Search(query, count, offset);

        public async Task<bool> Remove(int id) => await DefaultRepository?.Remove(id);

        public async Task<int> MoveDown(int id) => await DefaultRepository?.MoveDown(id);

        public async Task<int> MoveToBottom(int id) => await DefaultRepository?.MoveToBottom(id);

        public async Task<int> MoveToTop(int id) => await DefaultRepository?.MoveToTop(id);

        public async Task<int> MoveUp(int id) => await DefaultRepository?.MoveUp(id);
    }
}
