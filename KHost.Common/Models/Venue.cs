namespace KHost.Common.Models
{
    public class Venue : BaseModel, IModelWithId, IModelWithName
    {
        public int? Id { get; set; }

        public string Name { get; set; } = "";

        public string Notes { get; set; } = "";

        public override Venue Clone() => (base.Clone() as Venue)!;
    }
}
