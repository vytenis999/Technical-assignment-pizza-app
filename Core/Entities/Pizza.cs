namespace Core.Entities
{
    public class Pizza : BaseEntity
    {
        public int PizzaSizeId { get; set; }
        public PizzaSize PizzaSize { get; set; }
        public List<PizzaTopping> PizzaToppings { get; set; } = new List<PizzaTopping>();
        public double PizzaTotalPrice { get; set; }
    }
}
