namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public double OrderTotalPrice { get; set; }
        public List<PizzaToReturnDto> Pizzas { get; set; }
    }
}
