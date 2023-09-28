using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Entities;
using Core.Interfaces;

namespace PizzaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaRepository _pizzaRepository;

        public PizzasController(IPizzaRepository pizzaRepository)
        {
            _pizzaRepository = pizzaRepository;
        }

        [HttpGet("toppings")]
        public async Task<ActionResult<List<Topping>>> GetToppings()
        {
            var toppings = await _pizzaRepository.GetToppingsAsync();

            return Ok(toppings);
        }

        [HttpGet("sizes")]
        public async Task<ActionResult<List<PizzaSize>>> GetSizes()
        {
            var sizes = await _pizzaRepository.GetSizesAsync();

            return Ok(sizes);
        }
    }
}
