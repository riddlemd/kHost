using System;

namespace KHost.Common.Models
{
    public class SingerPerformance : BaseModel, IModelWithId
    {
        public int? Id { get; set; }

        public int SingerId { get; set; }

        public int SongId { get; set; }

        public int VenueId { get; set; }

        public DateTime Date { get; set; }

        public override SingerPerformance Clone() => (base.Clone() as SingerPerformance)!;
    }
}
