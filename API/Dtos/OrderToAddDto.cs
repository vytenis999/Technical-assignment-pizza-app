namespace API.Dtos
{
    public class OrderToAddDto
    {
        public List<PizzaToAddDto>  Pizzas{ get; set; }
        public double OrderTotalPrice { get; set; }
    }
}
