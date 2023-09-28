using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class PizzaSize : BaseEntity
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public int Diameter { get; set; }
        [JsonIgnore]
        public List<Pizza> Pizzas { get; set; } = new List<Pizza>();
    }
}
