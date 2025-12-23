# TaskManagement

A full-stack task management application built with ASP.NET Core backend, Angular frontend, and PostgreSQL database, containerized and deployed using Kubernetes with Flux CD.

## Architecture

- **Backend**: ASP.NET Core Web API (.NET 8)
- **Frontend**: Angular application
- **Database**: PostgreSQL managed by CloudNativePG operator
- **Infrastructure**: Docker, Kubernetes, Helm, Flux CD

## Project Structure

- `ClientApp/`: Angular frontend application
- `TaskManagement/`: ASP.NET Core API project
- `TaskManagement.Service/`: Business logic layer
- `TaskManagement.Shared/`: Shared models and enums
- `TaskManagement.Storage/`: Data access layer with Entity Framework
- `kubernetes/`: Kubernetes manifests and Helm charts
- `docker-compose.yml`: Local development setup

## Local Development

### Prerequisites

- .NET 8 SDK
- Node.js 18+
- Docker Desktop
- Rancher Desktop (for Kubernetes)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskManagement
   ```

2. **Backend Setup**
   ```bash
   cd TaskManagement
   dotnet restore
   dotnet build
   ```

3. **Frontend Setup**
   ```bash
   cd ClientApp/TaskManagementClient
   npm install
   ng build
   ```

4. **Database Setup**
   ```bash
   docker-compose up -d
   ```

5. **Run the Application**
   ```bash
   # Backend
   cd TaskManagement
   dotnet run

   # Frontend (in another terminal)
   cd ClientApp/TaskManagementClient
   ng serve
   ```

## Kubernetes Deployment

The application is designed for deployment on Kubernetes using Flux CD for GitOps.

### Infrastructure Overview

- **CNPG (CloudNativePG)**: PostgreSQL operator for database management
- **Flux CD**: GitOps tool for continuous deployment
- **Helm Charts**: Packaged applications for easy deployment
- **Ingress**: Traefik ingress controller for external access

### Components

#### CNPG Chart
- Deploys PostgreSQL clusters
- Manages database backups and high availability
- Generates application secrets automatically

#### Task Management Chart
- Deploys the ASP.NET Core API
- Includes HPA for autoscaling
- Configures ingress for external access

### Deployment Process

1. **Deploy via Flux**
   - Flux automatically deploys from `kubernetes/clusters/rancher-desktop/`
   - Monitors changes and updates deployments

2. **Access the Application**
   - Development: `http://task-management.dev.local`
   - Production: `http://task-management.local`

### Environment Configuration

- **Development**: Single replica, basic configuration
- **Production**: Multiple replicas, high availability, synchronous replication

### Monitoring and Scaling

- Horizontal Pod Autoscaler configured for CPU utilization
- Readiness and liveness probes for health checks
- Resource limits and requests defined

## API Documentation

The API provides endpoints for:
- User management
- Work item CRUD operations
- Authentication (cookie-based)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request

## License

[Add license information]