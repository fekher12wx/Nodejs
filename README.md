# 🟢 Node.js Learning Repository

A comprehensive collection of Node.js examples, projects, and learning resources.

![Node.js](https://via.placeholder.com/800x200/68a063/ffffff?text=Node.js+Learning+Hub)

## 📚 What's Inside

- **Basic Examples** - Core Node.js concepts and syntax
- **API Development** - REST APIs with Express.js
- **Database Integration** - MongoDB, MySQL, PostgreSQL examples
- **Authentication** - JWT, sessions, and security practices
- **File Operations** - Reading, writing, and processing files
- **Real-time Apps** - WebSocket and Socket.io implementations

## 🛠️ Technologies Covered

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **MySQL/PostgreSQL** - SQL databases
- **JWT** - JSON Web Tokens for authentication
- **Socket.io** - Real-time communication
- **Mongoose** - MongoDB object modeling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional for database examples)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fekher12wx/Nodejs.git
   cd Nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run examples**
   ```bash
   # Basic Node.js example
   node examples/basic/hello-world.js
   
   # Express server
   cd examples/express-api
   npm install
   npm start
   ```

## 📁 Project Structure

```
Nodejs/
├── examples/
│   ├── basic/              # Core Node.js concepts
│   ├── express-api/        # Express.js examples
│   ├── database/           # Database operations
│   ├── authentication/     # Auth examples
│   ├── file-operations/    # File system operations
│   └── real-time/          # WebSocket examples
├── projects/               # Complete mini-projects
├── docs/                   # Learning resources
└── README.md
```

## 🎯 Learning Path

### 1. **Node.js Basics**
- Understanding the event loop
- Working with modules
- File system operations
- HTTP server creation

### 2. **Express.js Framework**
- Setting up Express applications
- Routing and middleware
- Request/response handling
- Error handling

### 3. **Database Integration**
- Connecting to databases
- CRUD operations
- Data modeling
- Query optimization

### 4. **Authentication & Security**
- User registration and login
- Password hashing
- JWT implementation
- Security best practices

### 5. **Advanced Topics**
- Real-time applications
- Testing with Jest
- Deployment strategies
- Performance optimization

## 💡 Key Examples

### Basic HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Express API
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- examples/api.test.js
```

## 📖 Resources

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-example`)
3. Commit your changes (`git commit -m 'Add new example'`)
4. Push to the branch (`git push origin feature/new-example`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

**Happy Learning! 🚀**

*Made with fekher❤️ for the Node.js community*
