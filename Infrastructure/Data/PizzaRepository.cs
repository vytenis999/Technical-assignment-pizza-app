using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class PizzaRepository : IPizzaRepository
    {
        private readonly RestaurantContext _context;

        public PizzaRepository(RestaurantContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<PizzaSize>> GetSizesAsync()
        {
            return await _context.PizzaSizes.ToListAsync();
        }

        public async Task<IReadOnlyList<Topping>> GetToppingsAsync()
        {
            return await _context.Toppings.ToListAsync();
        }
    }
}
