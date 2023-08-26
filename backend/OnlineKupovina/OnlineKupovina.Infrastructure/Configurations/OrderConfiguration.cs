using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineKupovina.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineKupovina.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Price).IsRequired();
            builder.HasOne(x => x.Purchaser)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.PurchaserId);
            builder.HasMany(x => x.Items)
                .WithOne(x => x.Order);
        }
    }
}
