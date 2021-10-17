using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.Common.Repositories
{
    public class KHostDbContext : DbContext
    {
        public virtual DbSet<QueuedSinger> QueuedSingers { get; set; }

        public virtual DbSet<QueuedSong> QueuedSongs { get; set; }
        
        public virtual DbSet<Singer> Singers { get; set; }
        
        public virtual DbSet<Song> Songs { get; set; }

        public virtual DbSet<Venue> Venues { get; set; }

        public virtual DbSet<Download> Downloads { get; set; }

        public KHostDbContext(DbContextOptions<KHostDbContext> options) : base(options)
        {
            
        }
    }
}
