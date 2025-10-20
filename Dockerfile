FROM node:24-alpine3.21 AS frontend-build

WORKDIR /app

COPY ClientApp/TaskManagementClient/package*.json ./

RUN npm install

RUN npm i guid-typescript --save

COPY ClientApp/TaskManagementClient/ ./

RUN npm run build --prod

FROM mcr.microsoft.com/dotnet/sdk:8.0@sha256:ff8311847c54c04d1a14c488362807997d59b61372da5095a95f89cbcda7f9b7 AS backend-build

WORKDIR /src

COPY TaskManagement/TaskManagement/TaskManagement.csproj ./TaskManagement/
RUN dotnet restore TaskManagement/TaskManagement.csproj

COPY TaskManagement/ ./TaskManagement/

RUN dotnet publish TaskManagement/TaskManagement/TaskManagement.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine@sha256:c41927c17f93a060a001bbedf977c0aa30be3b7d6559ecc5b656edbac639cc84

WORKDIR /app

COPY --from=backend-build /app/publish ./

COPY --from=frontend-build /app/dist/task-management-client/browser ./wwwroot

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "TaskManagement.dll"]