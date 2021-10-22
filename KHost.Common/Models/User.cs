namespace KHost.Common.Models
{
    public class User : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Username { get; set; } = "";

        public string AccessKey { get; set; } = "";

        public override User Clone() => (base.Clone() as User)!;
    }
}
