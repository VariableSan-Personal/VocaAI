using AutoSummarize.Services;
using Microsoft.OpenApi.Models;

public class Startup
{
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddControllers();
    services.AddScoped<ExampleService>();

    // Add Swagger services
    services.AddSwaggerGen(c =>
    {
      c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    });
  }

  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
  {
    if (env.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
    }

    app.UseRouting();

    // Add middleware to disable browser caching
    app.Use(
      async (context, next) =>
      {
        context.Response.Headers["Cache-Control"] =
          "no-store, no-cache, must-revalidate, max-age=0";
        context.Response.Headers["Pragma"] = "no-cache";
        context.Response.Headers["Expires"] = "0";
        await next();
      }
    );

    // Add middleware to redirect root URL to /api
    app.Use(
      async (context, next) =>
      {
        if (context.Request.Path == "/")
        {
          context.Response.Redirect("/api");
          return;
        }
        await next();
      }
    );

    // Enable middleware to serve generated Swagger as a JSON endpoint
    app.UseSwagger();

    // Enable middleware to serve Swagger UI
    app.UseSwaggerUI(c =>
    {
      c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
      c.RoutePrefix = "swagger"; // Set Swagger UI at the app's root
    });

    app.UseEndpoints(endpoints =>
    {
      endpoints.MapControllers();
    });
  }
}
