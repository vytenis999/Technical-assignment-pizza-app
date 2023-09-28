using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task<List<Order>> GetUserOrdersAsync(string userId);
        Task<PizzaSize> GetPizzaSizeByIdAsync(int id); 
        Task<Topping> GetToppingByIdAsync(int id); 
    }
}
