using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using OnlineKupovina.Infrastructure.Context;

namespace OnlineKupovina.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // Dodaju se zvisnosti u kontejner za injekciju, nije bitno kojim redom
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddAuthentication(opt => {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters //Podesavamo parametre za validaciju pristiglih tokena
               {
                   ValidateIssuer = true, //Validira izdavaoca tokena
                   ValidateAudience = false, //Kazemo da ne validira primaoce tokena
                   ValidateLifetime = true,//Validira trajanje tokena
                   ValidateIssuerSigningKey = true, //validira potpis token, ovo je jako vazno!
                   ValidIssuer = "http://localhost:7119", //odredjujemo koji server je validni izdavalac
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecretKey"]))//navodimo privatni kljuc kojim su potpisani nasi tokeni
               };
           });


            // Zavisnosti (scoped, transient, singleton)
            // Uvek dodajemo scoped, takav im je zivotni vek 
            //services.AddScoped<IAuthenticationService, AuthenticationService>();


            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
            });

            //var mapperConfig = new MapperConfiguration(mc =>
            //{
            //    mc.AddProfile(new DTOs.Mapper());
            //});

            //IMapper mapper = mapperConfig.CreateMapper();
            //services.AddSingleton(mapper);

            //services.AddDbContext<OnlineKupovinaDBContext>(options =>
            				//options.UseSqlServer(Configuration.GetConnectionString("ProjectDBContext")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Podesava redosled izvrsavanja funkcija midlveru prilikom prijema HTTP zahteva
        // Bitno da se pozivaju tacno definisanim redosledom inace se nece startovati 
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors("AllowOrigin");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication(); // iznad authorization 
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
