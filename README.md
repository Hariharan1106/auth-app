# EatWisely - Restaurant Management System

A modern React-based web application for restaurant management and user authentication. This application provides a comprehensive dashboard for managing users, restaurant profiles, and user authentication.

## 🚀 Features

### User Authentication
- **User Registration**: Secure signup with email validation and password requirements
- **User Login**: Email/password authentication with localStorage persistence
- **Role-Based Access**: Support for different user roles (User, Admin, SuperAdmin)
- **Profile Management**: Users can update their profile information and upload profile pictures

### Dashboard & Management
- **User Management**: Admin panel to view, edit, and delete users with pagination
- **Restaurant Profile**: Dedicated section for restaurant information management
- **Search & Filter**: Advanced filtering by role and search functionality for users
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

### UI/UX Features
- **Modern Design**: Clean, professional interface with consistent color scheme
- **Form Validation**: Client-side validation for all forms
- **Image Upload**: Profile picture upload functionality
- **Confirmation Dialogs**: User confirmation for destructive actions

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.13.1** - Client-side routing
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **PostCSS 8.5.8** - CSS post-processor
- **Autoprefixer 10.4.27** - CSS vendor prefixer

### Development Tools
- **Vite 7.3.1** - Fast build tool and development server
- **ESLint 9.39.1** - Code linting and formatting
- **Node.js** - Runtime environment

## 📁 Project Structure

```
auth-app/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
├── src/
│   ├── components/           # Reusable components
│   │   ├── EditUserDrawer.jsx # User editing modal
│   │   ├── Header.jsx        # Page header component
│   │   └── Sidebar.jsx       # Navigation sidebar
│   ├── pages/               # Main page components
│   │   ├── Login.jsx        # User login page
│   │   ├── Profile.jsx      # User profile management
│   │   ├── Restuarant.jsx   # Restaurant profile page
│   │   ├── Signup.jsx       # User registration page
│   │   └── Users.jsx        # User management dashboard
│   ├── utils/               # Utility functions
│   │   └── auth.js          # Authentication utilities
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   ├── index.css            # CSS imports and base styles
│   └── main.jsx             # Application entry point
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── README.md               # This file
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hariharan1106/auth-app.git
   cd auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## 📋 Usage

### User Registration
1. Navigate to the homepage (`/`)
2. Fill in the registration form with:
   - Username (required)
   - Email (must be valid email format)
   - Password (minimum 6 characters)
   - Role selection (defaults to "User")
3. Click "Sign Up" to create account

### User Login
1. Navigate to `/login`
2. Enter your registered email and password
3. Click "Login" to access your dashboard

### User Management (Admin Features)
1. **View Users**: Browse all registered users with pagination
2. **Search Users**: Filter users by name or email
3. **Filter by Role**: View users by specific roles (User, Admin, SuperAdmin)
4. **Edit Users**: Click "Edit" to modify user information
5. **Delete Users**: Click "Delete" with confirmation dialog

### Profile Management
- Update username, email, password, and role
- Upload profile picture
- Save changes with confirmation
- Delete account with confirmation

### Restaurant Profile
- View and manage restaurant information
- Update restaurant name, email, and contact number
- Admin-only functionality

## 🔧 Configuration

### Environment Variables
No environment variables are currently required for this application.

### Database
This application uses **localStorage** for data persistence:
- User accounts stored in `users` key
- Current user session stored in `currentUser` key

### Styling
- **Primary Colors**: Lime green (`#8fa31e`) and red (`#ff0000`)
- **Typography**: System fonts with Arial fallback
- **Layout**: Responsive design with mobile-first approach

## 🎨 Design System

### Color Palette
- **Primary**: Lime Green (`#8fa31e`)
- **Secondary**: Red (`#ff0000`)
- **Accent**: Purple (for role badges)
- **Neutral**: Gray scale for text and borders

### Typography
- **Headers**: Bold, large font sizes
- **Body Text**: Medium weight, readable sizes
- **Buttons**: Uppercase with padding

### Components
- **Cards**: Rounded corners with shadow
- **Buttons**: Rounded with hover effects
- **Forms**: Border styling with focus states

## 🔒 Security Features

- **Client-side validation** for all forms
- **Password minimum length** requirement (6 characters)
- **Email format validation** using regex
- **Confirmation dialogs** for destructive actions
- **Role-based access control** for admin features

## 🚀 Deployment

### Production Build
```bash
npm run build
```

This creates an optimized build in the `dist` directory that can be deployed to any static hosting service.

### Recommended Hosting
- **Vercel**: `npm install -g vercel && vercel`
- **Netlify**: Connect repository and deploy
- **GitHub Pages**: Use GitHub Actions or manual deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Uses localStorage for simple, effective data persistence
- Responsive design with Tailwind CSS
- Clean, professional user interface

## 📞 Support

For support, email hariharan11062005@gmail.com or create an issue in the repository.

---

**Made with ❤️ using React**