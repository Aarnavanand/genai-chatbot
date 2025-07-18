# Aarnav AI Chat

A beautiful, modern AI chat application built by **Aarnav Anand** and powered by Google Gemini AI. This application provides an elegant interface for conversing with Google's advanced Gemini AI model.

## ✨ Features

- **Modern UI/UX**: Beautiful glass morphism design with smooth animations
- **Real-time Chat**: Instant responses from Google Gemini AI
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Floating Particles**: Dynamic background animations for visual appeal
- **Message History**: Maintains conversation context throughout the session
- **Typing Indicators**: Visual feedback when AI is generating responses
- **Error Handling**: Comprehensive error messages and API key validation
- **Local Storage**: Securely stores your API key locally in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- A Google Gemini API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aarnavanand/genai-chatbo
cd aarnav-ai-chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Getting Your Free Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Enter it in the application when prompted

**Free Tier Limits:**
- 15 requests per minute
- 1 million tokens per minute
- 1,500 requests per day
- No credit card required

## 🛠️ Built With

- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **GSAP** - Professional animations
- **Google Gemini AI** - Advanced AI language model
- **Lucide React** - Beautiful icons

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effect
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: GSAP-powered micro-interactions
- **Responsive Layout**: Mobile-first design approach
- **Custom Scrollbars**: Styled scrollbars for better UX
- **Floating Particles**: Dynamic background elements

## 📱 Usage

1. **Enter API Key**: On first visit, enter your Google Gemini API key
2. **Start Chatting**: Type your message and press Enter or click Send
3. **View Responses**: AI responses appear with typing indicators
4. **Clear Chat**: Use the Clear button to start a new conversation
5. **Change API Key**: Click "API Key" button to update your key

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
aarnav-ai-chat/
├── app/
│   ├── api/chat/          # API route for Gemini integration
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── MessageBubble.tsx  # Individual message component
│   ├── TypingIndicator.tsx # Typing animation component
│   └── FloatingParticles.tsx # Background particles
├── lib/
│   └── utils.ts           # Utility functions
└── README.md
```

## 🔒 Security & Privacy

- **Local Storage**: API keys are stored only in your browser
- **No Server Storage**: No data is stored on external servers
- **Direct API Calls**: Communications go directly to Google's servers
- **Client-Side Only**: All processing happens in your browser

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

This is a personal project by Aarnav Anand. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created by **Aarnav Anand** for personal and educational use.

## 👨‍💻 Author

**Aarnav Anand**
- Personal AI Chat Application
- Built with modern web technologies
- Powered by Google Gemini AI

## 🙏 Acknowledgments

- Google for providing the Gemini AI API
- Vercel for Next.js framework
- shadcn for beautiful UI components
- The open-source community for amazing tools

---

**Enjoy chatting with AI! 🤖✨**
