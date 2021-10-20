namespace KHost.Common.Models
{
    public class Download : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public int SongId { get; set; }

        public string Name { get; set; }

        public int Progress { get; set; }

        public override Download Clone() => base.Clone() as Download;
    }
}
