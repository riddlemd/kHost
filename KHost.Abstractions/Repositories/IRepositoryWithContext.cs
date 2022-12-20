namespace KHost.Abstractions.Repositories
{
    public interface IRepositoryWithContext
    {
        public IRepositoryContext Context { get; }
    }
}
