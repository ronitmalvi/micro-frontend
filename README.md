# Micro-Frontend Architecture

## Directory Architecture

```
micro-frontend/
├── chat/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── hooks/
│   │   │   └── useSocket.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── chat-server/
│   ├── index.js
├── email/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ComposeEmail.jsx
│   │   │   ├── EmailDetail.jsx
│   │   │   ├── EmailList.jsx
│   │   │   └── EmailSidebar.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── host/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── AppCard.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
└── README.md
```

## Tools and Frameworks Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Socket.IO**: A library for real-time web applications.
- **Express**: A minimal and flexible Node.js web application framework.
- **EmailJS**: A service to send emails directly from JavaScript.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Module Federation**: A feature in Webpack that allows multiple independent builds to form a single application.

## How to Set Up and Run the Application

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd micro-frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the Chat Server**:
   ```sh
   cd chat-server
   npm install
   node index.js
   ```

4. **Run the Chat Application**:
   ```sh
   cd chat
   npm install
   npm run build
   npm run preview -- --port 5001 #since the module federation wasn't working with only npm run dev
   ```

5. **Run the Email Application**:
   Before running the email application I have used email.js so you need your own SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY which needs to be updated in ComposeEmail.jsx file
   ```sh
   cd email
   npm install
   npm run build
   npm run preview -- --port 5002 #since the module federation wasn't working with only npm run dev
   ```

6. **Run the Host Application**:
   ```sh
   cd host
   npm install
   npm run dev
   ```

## Key Architectural Decisions and Trade-offs

1. **Micro-Frontend Architecture**:
   - **Decision**: Split the application into multiple smaller, independently deployable applications (Chat, Email, Host).
   - **Trade-off**: Increased complexity in managing multiple repositories and deployments, but allows for better scalability and independent development.

2. **Module Federation**:
   - **Decision**: Use Module Federation to share code between different micro-frontends.
   - **Trade-off**: Requires careful management of shared dependencies to avoid version conflicts, but enables code reuse and reduces duplication.

3. **Real-time Communication**:
   - **Decision**: Use Socket.IO for real-time communication in the Chat application.
   - **Trade-off**: Adds complexity to the application, but provides a seamless real-time experience for users.

4. **Styling with Tailwind CSS**:
   - **Decision**: Use Tailwind CSS for styling.
   - **Trade-off**: Requires learning a new utility-first CSS framework, but provides rapid UI development and consistent styling.

5. **Build Tool with Vite**:
   - **Decision**: Use Vite as the build tool.
   - **Trade-off**: Vite is relatively new compared to Webpack, but offers faster build times and a better development experience.

6. **Email Service with EmailJS**:
   - **Decision**: Use EmailJS for sending emails directly from the Email application.
   - **Trade-off**: Relies on a third-party service, but simplifies the process of sending emails from the frontend.

By making these architectural decisions, the project aims to achieve a scalable, maintainable, and efficient micro-frontend architecture that leverages modern tools and frameworks.
