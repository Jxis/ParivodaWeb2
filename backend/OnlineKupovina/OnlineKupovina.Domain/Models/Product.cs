using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineKupovina.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public double Price { get; set; }
        public Product() { }

        public Product(string name, int id, string ingredients, double price)
        {
            Name = name;
            Id = id;
            Ingredients = ingredients;
            Price = price;
        }
    }
}
