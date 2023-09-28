using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class PizzaTopping : BaseEntity
    {
        public int PizzaId { get; set; }
        public int ToppingId { get; set; }
        [JsonIgnore]
        public Pizza Pizza { get; set; }
        [JsonIgnore]
        public Topping Topping { get; set; }
    }
}
