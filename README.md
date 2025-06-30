# CodePair 🚀

**A Modern Coding Interview Platform with Real-time Collaboration**

CodePair is a comprehensive coding interview platform that bridges the gap between interviewers and candidates through seamless real-time video calling, collaborative coding environments, and intelligent assessment tools. Built with cutting-edge technologies, it provides a professional interview experience that scales.

![CodePair Banner](https://via.placeholder.com/800x300/1a1a2e/16213e?text=CodePair+-+Coding+Interview+Platform)

## ✨ Features

### 🎥 **Real-time Video Calling**
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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- ConvexDB account

### Installation

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
└── public/               # Static assets
```

## 🎯 Key Features Deep Dive

### ConvexDB Integration

CodePair leverages ConvexDB's reactive database capabilities to provide real-time updates and seamless data synchronization. The platform benefits from:

- **Real-time Subscriptions**: Live updates across all connected clients
- **Optimistic Updates**: Instant UI feedback with automatic conflict resolution
- **Server Functions**: Edge-optimized backend logic with JavaScript/TypeScript
- **Built-in File Storage**: Handle resume uploads and interview recordings
- **Vector Search**: Advanced search capabilities for candidate profiles

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

### ConvexDB Schema
The database schema includes tables for:
- Users (candidates, interviewers, admins)
- Interviews (scheduling, status, recordings)
- Assessments (evaluations, scores, feedback)
- Organizations (company settings, branding)

### Authentication Setup
Configure authentication providers in `convex/auth.config.js`:
```javascript
export default {
  providers: [
    {
      domain: "your-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};
```

## 🚢 Deployment

### Production Build
```bash
npm run build
npm start
```

### ConvexDB Deployment
```bash
npx convex deploy
```

### Environment Variables (Production)
Ensure all environment variables are set in your hosting platform:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 📈 Performance & Scalability

CodePair is built for scale with:
- **Edge Runtime**: Fast global performance
- **Real-time Database**: ConvexDB provides predictable query performance
- **Optimistic Updates**: Instant UI responsiveness
- **CDN Integration**: Fast asset delivery
- **Auto-scaling**: Handles traffic spikes automatically

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
- Open source community for inspiration and contributions

---

**Built with ❤️ by the CodePair Team**

*Transform your technical hiring process with CodePair - where great interviews happen.*
