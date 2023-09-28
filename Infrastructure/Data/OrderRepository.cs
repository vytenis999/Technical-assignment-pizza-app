using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly RestaurantContext _context;

        public OrderRepository(RestaurantContext context)
        {
            _context = context;
        }

        public async Task AddOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Order>> GetUserOrdersAsync(string userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.Pizzas)
                    .ThenInclude(p => p.PizzaSize)
                .Include(o => o.Pizzas)
                    .ThenInclude(p => p.PizzaToppings)
                        .ThenInclude(pt => pt.Topping)
                .ToListAsync();
        }

        public async Task<PizzaSize> GetPizzaSizeByIdAsync(int id)
        {
            return await _context.PizzaSizes.FindAsync(id);
        }

        public async Task<Topping> GetToppingByIdAsync(int id)
        {
            return await _context.Toppings.FindAsync(id);
        }
    }
}
