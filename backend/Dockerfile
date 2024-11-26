FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY backend.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

ARG ASPNETCORE_HTTP_PORTS
ENV ASPNETCORE_HTTP_PORTS=${ASPNETCORE_HTTP_PORTS}

ENTRYPOINT ["dotnet", "backend.dll"]
