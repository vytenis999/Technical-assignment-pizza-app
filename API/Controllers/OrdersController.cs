using API.Dtos;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace PizzaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;

        public OrdersController(IOrderRepository orderRepository, IAccountRepository accountRepository)
        {
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder(OrderToAddDto orderDto)
        {
            var email = "string";

            var authorizationHeader = Request.Headers["Authorization"].ToString();
            if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);
                email = jwtToken.Claims.First(claim => claim.Type == "email")?.Value;
            }

            var user = await _accountRepository.FindByEmailAsync(email);

            var order = new Order
            {
                OrderTotalPrice = orderDto.OrderTotalPrice,
            };

            if (user != null)
            {
                order.UserId = user.Id;
            }

            foreach (var pizzaDto in orderDto.Pizzas)
            {
                var pizza = new Pizza
                {
                    PizzaSizeId = pizzaDto.PizzaSizeId,
                    PizzaTotalPrice = pizzaDto.PizzaTotalPrice
                };

                foreach (var toppingId in pizzaDto.ToppingsIds)
                {
                    pizza.PizzaToppings.Add(new PizzaTopping
                    {
                        ToppingId = toppingId
                    });
                }

                order.Pizzas.Add(pizza);
            }

            await _orderRepository.AddOrderAsync(order);

            return Ok();
        }

        [HttpPost("calculation")]
        public async Task<IActionResult> CalculateOrder(OrderToAddDto orderDto)
        {
            double totalOrderPrice = 0;
            List<PizzaCalculationDto> pizzaCalculations = new List<PizzaCalculationDto>();

            foreach (var pizzaDto in orderDto.Pizzas)
            {
                var pizzaSize = await _orderRepository.GetPizzaSizeByIdAsync(pizzaDto.PizzaSizeId);
                double pizzaPrice = pizzaSize.Price;

                double toppingsCost = pizzaDto.ToppingsIds.Count * 1; // each topping adds 1 euro
                pizzaPrice += toppingsCost;

                // If more than 3 toppings, apply a 10% discount
                if (pizzaDto.ToppingsIds.Count > 3)
                {
                    pizzaPrice *= 0.9;
                }

                totalOrderPrice += pizzaPrice;

                pizzaCalculations.Add(new PizzaCalculationDto
                {
                    Price = pizzaPrice
                });
            }

            var result = new OrderCalculationResultDto
            {
                TotalPrice = totalOrderPrice,
                PizzaPrices = pizzaCalculations
            };

            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<OrderToReturnDto>>> GetUserOrders()
        {
            var email = "string";

            var authorizationHeader = Request.Headers["Authorization"].ToString();
            if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);
                email = jwtToken.Claims.First(claim => claim.Type == "email")?.Value;
            }
            else
            {
                return BadRequest();
            }


            var user = await _accountRepository.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var orders = await _orderRepository.GetUserOrdersAsync(user.Id);

            var ordersToReturn = orders.Select(o => new OrderToReturnDto
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                OrderTotalPrice = o.OrderTotalPrice,
                Pizzas = o.Pizzas.Select(p => new PizzaToReturnDto
                {
                    PizzaSizeId = p.PizzaSizeId,
                    PizzaSizeName = p.PizzaSize.Name,
                    PizzaTotalPrice = p.PizzaTotalPrice,
                    Toppings = p.PizzaToppings.Select(pt => new ToppingToReturnDto
                    {
                        ToppingId = pt.ToppingId,
                        ToppingName = pt.Topping.Name
                    }).ToList()
                }).ToList()
            }).ToList();

            return Ok(ordersToReturn);
        }
    }
}

