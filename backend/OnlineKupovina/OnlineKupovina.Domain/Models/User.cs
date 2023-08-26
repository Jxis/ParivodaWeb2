using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineKupovina.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public DateTime Birthdate { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public byte[] Image { get; set; }
        public ICollection<Order> Orders { get; set; }
        public UserState State { get; set; }

        public User() { }

        public User(string username, string email, string password, string name, string lastname, DateTime birthdate, string address, UserRole role, byte[] image)
        {
            Username = username;
            Email = email;
            Password = password;
            Name = name;
            Lastname = lastname;
            Birthdate = birthdate;
            Address = address;
            Role = role;
            Image = image;
        }
    }
}
