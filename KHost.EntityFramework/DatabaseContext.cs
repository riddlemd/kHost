using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework
{
    internal class DatabaseContext : DbContext, IRepositoryContext
    {
        public virtual DbSet<QueuedSinger>? QueuedSingers { get; set; }

        public virtual DbSet<QueuedSong>? QueuedSongs { get; set; }

        public virtual DbSet<Singer>? Singers { get; set; }

        public virtual DbSet<Song>? Songs { get; set; }

        public virtual DbSet<Venue>? Venues { get; set; }

        public virtual DbSet<SingerPerformance>? SingerPerformances { get; set; }

        public virtual DbSet<Download>? Downloads { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        async Task<bool> IRepositoryContext.SaveAsync() => await SaveChangesAsync() > 0;
    }
}
