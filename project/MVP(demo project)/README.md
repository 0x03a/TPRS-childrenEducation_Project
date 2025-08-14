# 🌟 StoryLand Adventures

A **Progressive Web App (PWA)** for children's storytelling with **bilingual support** (English/Arabic) and **offline capabilities**.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Navigate to: `http://localhost:8000`
   - The app will automatically reload when you make changes!

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with **automatic reloading** |
| `npm start` | Start production server |
| `npm run build` | Build project (not required for this project) |
| `npm test` | Run tests (not configured yet) |

## 🔧 Development Features

### **Nodemon Integration**
- ✅ **Automatic reloading** when files change
- ✅ **Watches** all JS, HTML, CSS, and JSON files
- ✅ **Smart restarting** only when needed
- ✅ **Development mode** with detailed logging

### **Express Server**
- ✅ **Static file serving** for all project files
- ✅ **SPA support** with proper routing
- ✅ **CORS enabled** for development
- ✅ **Graceful shutdown** handling

### **Hot Reloading**
- ✅ **Browser auto-refresh** on file changes
- ✅ **No manual refresh** needed during development
- ✅ **Instant updates** when you save files

## 🌐 Features

### **Bilingual Support**
- 🇺🇸 **English** (default)
- 🇵🇸 **Palestinian Arabic** (automatic translation)
- 🔄 **One-click language switching**
- 💾 **Offline translation support**

### **Story Features**
- 📚 **Interactive stories** for children aged 4-10
- 🎵 **Audio narration** with controls
- 📖 **Vocabulary building** with new words
- ⭐ **Progress tracking** and star rewards

### **PWA Capabilities**
- 📱 **Mobile-first design**
- 🔌 **Offline functionality**
- 📲 **Installable** on mobile devices
- 🚀 **Fast loading** with caching

## 🗂️ Project Structure

```
StoryLand-Adventures/
├── index.html          # Main HTML file
├── app.js             # Main JavaScript application
├── styles.css         # Custom CSS styles
├── server.js          # Node.js Express server
├── package.json       # Project dependencies and scripts
├── nodemon.json       # Nodemon configuration
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
└── README.md         # This file
```

## 🧪 Debugging

### **Debug Buttons**
- 🔵 **Blue Button** (top-left): Comprehensive app state analysis
- 🔴 **Red Button** (top-right): Test modal functionality

### **Console Logging**
- 📝 **Detailed initialization** logs
- 🐛 **Error tracking** with stack traces
- 🌍 **Language switching** progress
- 🔐 **Modal operations** debugging

## 🚀 Production Deployment

### **Build for Production**
```bash
npm start
```

### **Environment Variables**
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Environment mode (development/production)

## 🔍 Troubleshooting

### **Common Issues**

1. **Port already in use:**
   ```bash
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

2. **Dependencies not installed:**
   ```bash
   npm install
   ```

3. **Node version too old:**
   ```bash
   # Check version
   node --version
   # Should be 14.0.0 or higher
   ```

### **Debug Mode**
- Open browser console (F12)
- Look for detailed logging
- Use debug buttons for element verification
- Check for any error messages

## 📱 Browser Support

- ✅ **Chrome** (recommended)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile browsers**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- Built for children's education
- Bilingual storytelling support
- Progressive Web App technology
- Offline-first approach

---

**Happy Storytelling! 📚✨** 