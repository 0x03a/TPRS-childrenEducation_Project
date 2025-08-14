const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for development
app.use(cors());

// Serve static files
app.use(express.static(__dirname));

// Serve the main HTML file for all routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 ===== STORYLAND ADVENTURES SERVER =====');
    console.log(`🌍 Server running on: http://localhost:${PORT}`);
    console.log(`📱 PWA accessible at: http://localhost:${PORT}`);
    console.log(`🔧 Development mode: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('🚀 ===== SERVER STARTED SUCCESSFULLY =====');
    console.log('');
    console.log('💡 Development Tips:');
    console.log('   • Use "npm run dev" for automatic reloading');
    console.log('   • Browser will auto-refresh when files change');
    console.log('   • Check console for detailed debugging output');
    console.log('   • Use debug buttons to troubleshoot issues');
    console.log('');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server terminated');
    process.exit(0);
}); 