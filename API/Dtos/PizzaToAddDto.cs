namespace API.Dtos
{
    public class PizzaToAddDto
    {
        public int PizzaSizeId { get; set; }
        public List<int> ToppingsIds { get; set; }
        public double PizzaTotalPrice { get; set; }
    }
}