using KHost.App.Configuration;
using KHost.App.ErrorHandling;
using KHost.App.Models.Responses;
using KHost.App.Providers;
using KHost.App.Repositories;
using KHost.App.Repositories.SQLite;
using KHost.Common.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Data;

namespace KHost.App
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddOptions()
                // Configurations
                .Configure<SingerOptions>(Configuration.GetSection("Singers"))
                .Configure<SongOptions>(Configuration.GetSection("Songs"))
                // Database
                .AddSingleton<SQLiteClientProvider>()
                // Repositories
                .AddTransient<ISongRepository, SQLiteSongsRepository>()
                .AddTransient<ISingersRepository, SQLiteSingersRepository>()
                .AddTransient<IQueuedSingersRepository, SQLiteQueuedSingerRepository>()
                // Providers
                .AddTransient<SingersProvider>()
                .AddTransient<SongsProvider>()
                .AddTransient<QueuedSingersProvider>()
                // ASP.NET CORE
                .AddControllersWithViews();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();

                app.UseExceptionHandler(errorApp =>
                    errorApp.Run(async context =>
                    {
                        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();

                        if(exceptionHandlerPathFeature.Error is KHostException kHostException)
                        {
                            context.Response.StatusCode = (int)kHostException.HttpStatusCode;
                        }

                        if(context.Request.IsApiRequest())
                        {
                            await context.Response.WriteAsync(new ErrorResponse(exceptionHandlerPathFeature.Error).ToString());
                        }
                    })
                );
            }
            else
            {
                app.UseExceptionHandler(errorApp =>
                    errorApp.Run(async context =>
                    {
                        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                        var ex = exceptionHandlerPathFeature.Error;
                    })
                );

                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
