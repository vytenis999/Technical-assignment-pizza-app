namespace API.Dtos
{
    public class OrderCalculationResultDto
    {
        public double TotalPrice { get; set; }
        public List<PizzaCalculationDto> PizzaPrices { get; set; }
    }
}
