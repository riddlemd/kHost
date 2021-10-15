namespace KHost.Common.Models
{
    public class Singer : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Name { get; set; }
    }
}
