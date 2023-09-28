using Core.Entities.Identity;
using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<Pizza> Pizzas { get; set; } = new List<Pizza>();
        public double OrderTotalPrice { get; set; }
        public string UserId { get; set; }
        [JsonIgnore]
        public AppUser User { get; set; }
    }
}
