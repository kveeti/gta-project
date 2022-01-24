# BUILD
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS BUILD
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o out


# DEPLOY
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=BUILD /app/out .
ENTRYPOINT ["dotnet", "Backend.Api.dll"]