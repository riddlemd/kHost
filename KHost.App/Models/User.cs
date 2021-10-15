namespace KHost.App.Models
{
    public class User : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public string Username { get; set; }

        public string AccessKey { get; set; }
    }
}
