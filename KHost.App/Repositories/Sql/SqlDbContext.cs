using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.App.Repositories.Sql
{
    public class SqlDbContext : DbContext
    {
        public virtual DbSet<QueuedSinger> QueuedSingers { get; set; }

        public virtual DbSet<QueuedSong> QueuedSongs { get; set; }
        
        public virtual DbSet<Singer> Singers { get; set; }
        
        public virtual DbSet<Song> Songs { get; set; }

        public virtual DbSet<Venue> Venues { get; set; }

        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
            
        }
    }
}
