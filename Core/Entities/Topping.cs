using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class Topping : BaseEntity
    {
        public string Name { get; set; }
        [JsonIgnore]
        public List<PizzaTopping> PizzaToppings { get; set; } = new List<PizzaTopping>();
    }
}
