using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.Common.Repositories.EF
{
    public class DatabaseContext : DbContext
    {
        public virtual DbSet<QueuedSinger> QueuedSingers { get; set; }

        public virtual DbSet<QueuedSong> QueuedSongs { get; set; }
        
        public virtual DbSet<Singer> Singers { get; set; }
        
        public virtual DbSet<Song> Songs { get; set; }

        public virtual DbSet<Venue> Venues { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }
    }
}
