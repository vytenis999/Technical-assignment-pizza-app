
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Infrastructure.Data
{
    public class RestaurantContextSeed
    {
        public static async Task SeedAsync(RestaurantContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Test",
                    Email = "test@test.com",
                    UserName = "Test",
                };

                await userManager.CreateAsync(user, "Test.0");
            }

            if (!context.Toppings.Any())
            {
                var toppingsData = File.ReadAllText("../Infrastructure/Data/SeedData/toppings.json");
                var toppings = JsonSerializer.Deserialize<List<Topping>>(toppingsData);
                context.Toppings.AddRange(toppings);
            }

            if (!context.PizzaSizes.Any())
            {
                var pizzaSizesData = File.ReadAllText("../Infrastructure/Data/SeedData/pizzaSizes.json");
                var pizzaSizes = JsonSerializer.Deserialize<List<PizzaSize>>(pizzaSizesData);
                context.PizzaSizes.AddRange(pizzaSizes);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
