# CodePair 🚀

**A Modern Coding Interview Platform with Real-time Collaboration**

CodePair is a comprehensive coding interview platform that bridges the gap between interviewers and candidates through seamless real-time video calling, collaborative coding environments, and intelligent assessment tools. Built with cutting-edge technologies, it provides a professional interview experience that scales.

## ✨ Features

### 🎥 **Real-time Video Calling and Code Editor**
- High-quality video and audio communication
- Screen sharing capabilities
- Instant connection with no setup required
- Optimized for low-latency interviews

### 📅 **Smart Scheduling System**
- Intuitive calendar integration
- Automated email notifications
- Time zone management
- Rescheduling and cancellation handling
- Bulk scheduling for multiple interviews

### 👨‍💼 **Comprehensive Admin Dashboard**
- **Interviewer Management**: Create, edit, and manage interviewer profiles
- **Performance Analytics**: Track interview success rates and feedback
- **Assessment Tools**: Standardized evaluation criteria and scoring
- **Report Generation**: Detailed insights and performance metrics
- **User Role Management**: Granular permissions and access control

### 💻 **Collaborative Coding Environment**
- Real-time code editor with syntax highlighting
- Multiple programming language support
- Live code execution and testing
- Shared whiteboard for system design discussions
- Code version history and playback

### 🎯 **Assessment & Evaluation**
- Customizable coding challenges
- Automated code quality analysis
- Real-time performance tracking
- Structured feedback collection
- Interview recording and playback

### 🐳 **Containerized Deployment**
- **Docker containerization** for consistent deployments
- **Nginx reverse proxy** for load balancing and SSL termination
- **Docker Compose** for easy multi-service orchestration
- **Production-ready** container configuration

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Shadcn/UI** - Beautiful and accessible components

### Backend & Database
- **ConvexDB** - Reactive real-time database
- **Real-time Subscriptions** - Live data synchronization
- **Server Functions** - Edge-optimized backend logic
- **File Storage** - Built-in asset management

### Real-time Communication
- **WebRTC** - Peer-to-peer video calling
- **Socket.io** - Real-time messaging
- **Screen Sharing API** - Native screen sharing

### Authentication & Security
- **Clerk/Auth0** - User authentication
- **Role-based Access Control** - Secure permissions
- **Data Encryption** - End-to-end security

### Infrastructure & Deployment
- **Docker** - Containerization platform
- **Nginx** - Reverse proxy and load balancer
- **Docker Compose** - Multi-container orchestration
- **SSL/TLS** - Secure communications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- ConvexDB account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Varun5711/codepair.git
   cd codepair
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up ConvexDB**
   ```bash
   npx convex dev
   ```

4. **Environment Configuration**
   Create a `.env.local` file:
   ```env
   CONVEX_DEPLOYMENT=your-deployment-url
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
   CLERK_SECRET_KEY=your-clerk-secret
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### 🐳 Docker Deployment

#### Quick Start with Docker Compose

1. **Clone and configure**
   ```bash
   git clone https://github.com/Varun5711/codepair.git
   cd codepair
   cp .env.example .env.production
   # Edit .env.production with your configuration
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Application: `http://localhost:3000`
   - Nginx proxy: `http://localhost` (port 80)

#### Manual Docker Setup

1. **Build the Docker image**
   ```bash
   docker build -t codepair-app .
   ```

2. **Run the application container**
   ```bash
   docker run -d \
     --name codepair-app \
     -p 3000:3000 \
     --env-file .env.production \
     codepair-app
   ```

3. **Run Nginx reverse proxy**
   ```bash
   docker run -d \
     --name nginx-proxy \
     -p 80:80 \
     -p 443:443 \
     --link codepair-app:app \
     -v ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
     nginx:alpine
   ```

#### Docker Hub Deployment

Pull and run the pre-built image:

```bash
# Pull the latest image
docker pull varun5711/codepair-app:latest

# Run with environment variables
docker run -d \
  --name codepair \
  -p 3000:3000 \
  -e CONVEX_DEPLOYMENT=your-deployment \
  -e NEXT_PUBLIC_CONVEX_URL=your-convex-url \
  varun5711/codepair-app:latest
```

## 📁 Project Structure

```
codepair/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard routes
│   ├── interview/         # Interview room pages
│   └── admin/             # Admin panel
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── interview/        # Interview-specific components
│   └── admin/            # Admin dashboard components
├── convex/               # ConvexDB backend
│   ├── schema.ts         # Database schema
│   ├── users.ts          # User management functions
│   ├── interviews.ts     # Interview operations
│   └── admin.ts          # Admin functions
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
├── public/               # Static assets
├── docker-compose.yml    # Multi-service configuration
├── Dockerfile           # Container build instructions
├── nginx/               # Nginx configuration
│   └── nginx.conf       # Reverse proxy settings
└── .dockerignore        # Docker ignore patterns
```

## 🎯 Key Features Deep Dive

### ConvexDB Integration

CodePair leverages ConvexDB's reactive database capabilities to provide real-time updates and seamless data synchronization. The platform benefits from:

- **Real-time Subscriptions**: Live updates across all connected clients
- **Optimistic Updates**: Instant UI feedback with automatic conflict resolution
- **Server Functions**: Edge-optimized backend logic with JavaScript/TypeScript
- **Built-in File Storage**: Handle resume uploads and interview recordings
- **Vector Search**: Advanced search capabilities for candidate profiles

### Docker Architecture

The application is containerized for consistent deployment across environments:

- **Application Container**: Next.js app running on Node.js
- **Nginx Container**: Reverse proxy for load balancing and SSL termination
- **Multi-stage Build**: Optimized image size with production builds
- **Health Checks**: Container health monitoring
- **Volume Mounting**: Persistent data and configuration management

### Nginx Configuration

The Nginx reverse proxy provides:

- **Load Balancing**: Distribute traffic across multiple app instances
- **SSL Termination**: Handle HTTPS certificates and encryption
- **Static Asset Serving**: Efficient delivery of CSS, JS, and media files
- **Request Routing**: Route API calls and static content appropriately
- **Security Headers**: Enhanced security with proper HTTP headers

### Interview Flow

1. **Scheduling**: Admin/Interviewer creates interview slot
2. **Notification**: Automated emails sent to all participants
3. **Preparation**: Candidate receives interview details and prep materials
4. **Interview Room**: Real-time video call with collaborative coding
5. **Assessment**: Live evaluation and feedback collection
6. **Follow-up**: Automated reports and next steps

## 📊 Admin Dashboard Features

### Interview Management
- Create and schedule interviews
- Assign interviewers and set evaluation criteria
- Monitor live interviews
- Access interview recordings and transcripts

### Interviewer Portal
- Personal dashboard with upcoming interviews
- Access to candidate profiles and resumes
- Evaluation forms and scoring tools
- Performance analytics and feedback history

### Analytics & Reporting
- Interview success rates and trends
- Interviewer performance metrics
- Candidate experience feedback
- Custom report generation

## 🔧 Configuration

### Docker Environment Variables

Create a `.env.production` file for Docker deployment:

```env
# Application
NODE_ENV=production
PORT=3000

# ConvexDB
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret

# Security
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
```

### Nginx Configuration

Basic `nginx/nginx.conf` for reverse proxy:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/ {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### ConvexDB Schema
The database schema includes tables for:
- Users (candidates, interviewers, admins)
- Interviews (scheduling, status, recordings)
- Assessments (evaluations, scores, feedback)
- Organizations (company settings, branding)

## 🚢 Deployment Options

### Production Deployment with Docker

1. **Using Docker Compose (Recommended)**
   ```bash
   # Production deployment
   docker-compose -f docker-compose.prod.yml up -d
   
   # Scale the application
   docker-compose -f docker-compose.prod.yml up -d --scale app=3
   ```

2. **Manual Production Setup**
   ```bash
   # Build production image
   docker build -t codepair-app:prod --target production .
   
   # Run with production settings
   docker run -d \
     --name codepair-prod \
     --restart unless-stopped \
     -p 3000:3000 \
     --env-file .env.production \
     codepair-app:prod
   ```

### Cloud Deployment

The containerized setup supports deployment on:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Kubernetes clusters**

### ConvexDB Deployment
```bash
npx convex deploy --prod
```

## 📈 Performance & Scalability

CodePair is built for scale with:
- **Edge Runtime**: Fast global performance
- **Real-time Database**: ConvexDB provides predictable query performance
- **Optimistic Updates**: Instant UI responsiveness
- **CDN Integration**: Fast asset delivery
- **Auto-scaling**: Handles traffic spikes automatically
- **Container Orchestration**: Horizontal scaling with Docker Swarm or Kubernetes
- **Load Balancing**: Nginx distributes traffic efficiently

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [CodePair Docs](https://docs.codepair.dev)
- **Community**: [Discord Server](https://discord.gg/codepair)
- **Issues**: [GitHub Issues](https://github.com/yourusername/codepair/issues)
- **Email**: support@codepair.dev

## 🙏 Acknowledgments

- [ConvexDB](https://convex.dev) for the reactive database platform
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Clerk](https://clerk.dev) for authentication
- [Docker](https://docker.com) for containerization
- [Nginx](https://nginx.org) for reverse proxy capabilities
- Open source community for inspiration and contributions

---

**Built with ❤️ by the CodePair Team**

*Transform your technical hiring process with CodePair - where great interviews happen.*

### Quick Deploy Commands

```bash
# Clone and deploy in one go
git clone https://github.com/Varun5711/codepair.git && cd codepair
cp .env.example .env.production
# Edit .env.production with your settings
docker-compose up -d

# Or pull from Docker Hub
docker pull varun5711/codepair-app:latest
docker run -d -p 3000:3000 --name codepair varun5711/codepair-app:latest
```
