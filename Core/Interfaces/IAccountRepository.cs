using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IAccountRepository
    {
        Task<AppUser> FindByEmailAsync(string email);
        Task<IdentityResult> CreateAsync(AppUser user, string password);
        Task<SignInResult> CheckPasswordSignInAsync(AppUser user, string password, bool lockoutOnFailure);
    }
}
