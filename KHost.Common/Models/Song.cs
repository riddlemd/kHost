namespace KHost.Common.Models
{
    public class Song : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string BandName { get; set; }
    }
}
