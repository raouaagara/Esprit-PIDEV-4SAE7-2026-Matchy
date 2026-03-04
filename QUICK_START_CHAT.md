# Quick Start Guide - Chat Feature

## 🚀 Start the Application

### 1. Start Backend (Port 9090)
```bash
cd PI
./mvnw spring-boot:run -DskipTests
```

### 2. Start Frontend (Port 4200)
```bash
cd matchy-angular
ng serve
```

## 📱 Access the Chat

### For Freelancers:
1. Go to http://localhost:4200
2. Login as freelancer
3. Click "Messages" in the sidebar
4. Select a project from the list
5. Start chatting!

### For Companies:
1. Go to http://localhost:4200/backoffice
2. Login as company
3. Click "Messages" in the sidebar
4. Select a project from the list
5. Start chatting!

## 💬 How to Use

### Send Text Message:
- Type your message in the input box
- Press Enter or click the send button (➤)

### Send Image/File:
1. Click the attachment button (📎)
2. Select a file (max 10MB)
3. File preview appears
4. Click send button
5. Image displays inline, files show as downloads

### Features:
- ✅ Real-time updates every 5 seconds
- ✅ Auto-scroll to latest message
- ✅ Messages marked as read automatically
- ✅ Date separators between days
- ✅ Dark mode support
- ✅ Responsive design

## 🎨 UI Elements

### Message Colors:
- **Your messages**: Blue-purple gradient (right side)
- **Other messages**: Gray background (left side)

### Project List:
- Click any project to open chat
- Active project has blue border
- Avatar shows first letter of project name

### File Types Supported:
- Images: JPG, PNG, GIF, WEBP (display inline)
- Documents: PDF, DOC, DOCX (download link)
- Spreadsheets: XLS, XLSX (download link)
- Archives: ZIP, RAR (download link)
- Videos: MP4, AVI (download link)
- Audio: MP3, WAV (download link)

## 🔧 Troubleshooting

### No projects showing?
- Make sure you have projects created
- Check if backend is running on port 9090
- Verify you're logged in

### Messages not sending?
- Check browser console for errors
- Verify backend is running
- Check file size (max 10MB)

### Real-time not working?
- Messages update every 5 seconds
- Wait a few seconds after sending
- Check network tab for polling requests

## 📊 Backend Endpoints

Base URL: `http://localhost:9090/api/messages`

- POST `/send` - Send message
- GET `/thread/{projectId}/{userId}` - Get messages
- POST `/upload` - Upload file
- PUT `/thread/{projectId}/{userId}/read-all` - Mark as read

## 🎯 Test Scenarios

1. **Basic Chat**:
   - Login as freelancer
   - Select project
   - Send "Hello!"
   - Login as company (different browser/incognito)
   - Select same project
   - Reply "Hi there!"
   - Both should see messages

2. **File Upload**:
   - Click attachment button
   - Select an image
   - Send it
   - Image should display inline
   - Try a PDF - should show download link

3. **Real-Time**:
   - Open chat in two browsers
   - Send message from one
   - Wait 5 seconds
   - Message appears in other browser

4. **Dark Mode**:
   - Toggle dark mode
   - Chat should adapt colors
   - Messages remain readable

## ✨ Tips

- Press Enter to send (Shift+Enter for new line)
- Scroll up to see older messages
- Click project name to switch chats
- Files upload automatically when you click send
- Messages auto-mark as read when you view them

## 🐛 Common Issues

**Port 9090 already in use:**
```bash
# Windows
netstat -ano | findstr :9090
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:9090 | xargs kill -9
```

**Angular compilation errors:**
```bash
cd matchy-angular
rm -rf node_modules package-lock.json
npm install
ng serve
```

**Backend compilation errors:**
```bash
cd PI
./mvnw clean install -DskipTests
./mvnw spring-boot:run -DskipTests
```

## 📝 Notes

- Messages are stored in database
- Files stored in `./uploads/messages/`
- Polling interval: 5 seconds
- Max file size: 10MB
- Supports all file types
- Auto-scrolls to latest message
- Dark mode fully supported

Enjoy chatting! 💬✨
