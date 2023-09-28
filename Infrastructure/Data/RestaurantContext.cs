using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Core.Entities.Identity;

namespace Infrastructure.Data
{
    public class RestaurantContext : IdentityDbContext<AppUser>
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> options) : base(options)
        {
        }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<PizzaSize> PizzaSizes { get; set; }
        public DbSet<PizzaTopping> PizzaToppings { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
