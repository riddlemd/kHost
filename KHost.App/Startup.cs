using KHost.App.Configuration;
using KHost.Common.Routing;
using KHost.Common.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using System.IO;
using KHost.App.SongImporters;
using KHost.App.Providers;
using KHost.App.SongSearchEngines;
using KHost.App.Plugins;
using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Providers;
using KHost.Abstractions.Plugins;
using KHost.EntityFramework;
using KHost.App.Areas.Api.Models.Responses;

namespace KHost.App
{
    internal class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddOptions()
                .LoadPlugins()
                // Configurations
                .Configure<SingerOptions>(Configuration.GetSection("Singers"))
                .Configure<SongOptions>(Configuration.GetSection("Songs"))
                // Providers
                .AddScoped<ISongSearchProvider, DefaultSongSearchProvider>()
                .AddScoped<ISongImporterProvider, DefaultSongImporterProvider>()
                .AddScoped<IPluginsProvider, DefaultPluginsProvider>()
                // Repositories
                .AddEntityFrameworkRepositories(Configuration)
                // Song Search Engines
                .AddSearchEnginesDynamically()
                // Song Importers
                .AddSongImportersDynamically()
                // ASP.NET CORE
                .AddControllersWithViews(options =>
                {
                    options.Conventions.Add(new RouteTokenTransformerConvention(new DashedParameterTransformer()));
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    //options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: "Custom",
                    builder =>
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                    );
            });
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();

                app.UseExceptionHandler(errorApp =>
                    errorApp.Run(async context =>
                    {
                        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();

                        if (exceptionHandlerPathFeature?.Error is KHostException kHostException)
                        {
                            context.Response.StatusCode = (int)kHostException.HttpStatusCode;
                        }

                        if (context.Request.IsApiRequest())
                        {
                            await context.Response.WriteAsync(new ErrorResponse(exceptionHandlerPathFeature?.Error).ToString());
                        }
                    })
                );
            }
            else
            {
                app.UseExceptionHandler(errorApp =>
                    errorApp.Run(context =>
                    {
                        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                        var ex = exceptionHandlerPathFeature?.Error;
                        return Task.CompletedTask;
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

            app.UseCors("Custom");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
