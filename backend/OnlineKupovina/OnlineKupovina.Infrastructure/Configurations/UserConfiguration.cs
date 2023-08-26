using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using OnlineKupovina.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineKupovina.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Email).IsRequired();
            builder.Property(x => x.Password).IsRequired();
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Lastname).IsRequired();
            builder.Property(x => x.Username).IsRequired();
            builder.Property(x => x.Address).IsRequired();
            builder.Property(x => x.Birthdate).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();
            builder.HasMany(x => x.Orders)
                .WithOne(x => x.Purchaser);
        }
    }
}
