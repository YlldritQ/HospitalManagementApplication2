FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7058

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SecureEndpoints.csproj", "."]
RUN dotnet restore "./SecureEndpoints.csproj"
COPY . .
RUN dotnet build "SecureEndpoints.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SecureEndpoints.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install Entity Framework Core tools
RUN dotnet tool install --global dotnet-ef

# Add dotnet tools to PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Install SQL Server tools
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

ENV ASPNETCORE_URLS=http://+:7058
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ConnectionStrings__local="Server=sqlserver;Database=HospitalManagement2;User Id=sa;Password=Your_password123;TrustServerCertificate=True;"
ENV JWT__ValidIssuer="http://dotnet-backend:7058"
ENV JWT__ValidAudience="http://frontend:3000"
ENV JWT__Secret="asdasldnalsnQSHDAJS23EWJHDHAEH9Q12DNA"

ENTRYPOINT ["dotnet", "SecureEndpoints.dll"] 