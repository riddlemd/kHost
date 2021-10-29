namespace KHost.Common.Models
{
    public class Singer : BaseModel, IModelWithId, IModelWithName
    {
        public int? Id { get; set; }

        public string Name { get; set; } = "";

        public string Notes { get; set; } = "";

        public override Singer Clone() => (base.Clone() as Singer)!;
    }
}
