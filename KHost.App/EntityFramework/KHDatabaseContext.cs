using KHost.App.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.App.EntityFramework
{
    public class KHDatabaseContext : DbContext
    {
        public virtual DbSet<QueuedSinger> QueuedSingers { get; set; }

        public virtual DbSet<QueuedSong> QueuedSongs { get; set; }
        
        public virtual DbSet<Singer> Singers { get; set; }
        
        public virtual DbSet<Song> Songs { get; set; }

        public KHDatabaseContext(DbContextOptions<KHDatabaseContext> options) : base(options)
        {
            
        }
    }
}
