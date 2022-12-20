namespace KHost.Abstractions.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IUnitOfWork RegisterRepository(IRepository repository);

        IEnumerable<IRepository> GetRepositories();

        public TRepository? GetRepository<TRepository>() where TRepository : class;

        Task CompleteAsync();
    }
}
