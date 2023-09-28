﻿using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
