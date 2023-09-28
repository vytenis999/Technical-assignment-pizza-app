namespace API.Dtos
{
    public class PizzaToReturnDto
    {
        public int PizzaSizeId { get; set; }
        public string PizzaSizeName { get; set; }
        public double PizzaTotalPrice { get; set; }
        public List<ToppingToReturnDto> Toppings { get; set; }
    }
}
