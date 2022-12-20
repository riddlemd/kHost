using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KHost.Common.EntityFramework
{
    public class DatabaseContext : BaseContext
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
    }
}
