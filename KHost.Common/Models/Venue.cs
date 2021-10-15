namespace KHost.Common.Models
{
    public class Venue : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Name { get; set; }
    }
}
