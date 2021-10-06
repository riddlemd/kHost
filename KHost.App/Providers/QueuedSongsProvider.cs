﻿using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public class QueuedSongsProvider : ProviderWithRepository<QueuedSong, IQueuedSongsRepository>, IQueueProvider<QueuedSong>
    {
        public QueuedSongsProvider(IQueuedSongsRepository defaultRepository) : base(defaultRepository)
        {

        }

        public async Task<IEnumerable<QueuedSong>> GetAll() => await DefaultRepository?.Get();

        public async Task<(bool, int?)> Save(QueuedSong model) => await DefaultRepository?.Save(model);

        public async Task<IEnumerable<QueuedSong>> Search(string query) => await DefaultRepository?.Search(query);

        public async Task<bool> Remove(int id) => await DefaultRepository?.Remove(id);

        public async Task<int> MoveDown(int id) => await DefaultRepository?.MoveDown(id);

        public async Task<int> MoveToBottom(int id) => await DefaultRepository?.MoveToBottom(id);

        public async Task<int> MoveToTop(int id) => await DefaultRepository?.MoveToTop(id);

        public async Task<int> MoveUp(int id) => await DefaultRepository?.MoveUp(id);
    }
}
