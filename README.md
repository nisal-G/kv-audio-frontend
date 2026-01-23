# KV Audio - Frontend Application

A modern, responsive, and feature-rich web application for KV Audio, a professional audio equipment rental and sales platform built with React and Vite.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Deployment](#deployment)

---

## 🎯 Overview

The KV Audio Frontend is a cutting-edge React-based single-page application (SPA) that delivers a premium user experience for browsing, renting, and purchasing professional audio equipment. Built with modern web technologies and best practices, it features a clean, professional UI with full mobile responsiveness.

## ✨ Features

### User Experience
- ✅ Modern, clean, and professional UI/UX design
- ✅ Fully responsive mobile-first design
- ✅ Smooth animations and transitions
- ✅ Interactive image sliders and carousels
- ✅ Toast notifications for user feedback
- ✅ Intuitive navigation with mobile menu

### Customer Features
- ✅ Browse audio equipment catalog with advanced filtering
- ✅ Detailed product overview with image galleries
- ✅ Rental booking system with date selection
- ✅ User registration and authentication
- ✅ Google OAuth integration
- ✅ Email verification with OTP
- ✅ Customer review submission
- ✅ Contact form for inquiries
- ✅ User profile management with avatar
- ✅ Order history and tracking

### Admin Features
- ✅ Comprehensive admin dashboard
- ✅ Product management (CRUD operations)
- ✅ User management and blocking
- ✅ Order approval and tracking
- ✅ Review moderation system
- ✅ Inquiry management and responses
- ✅ Analytics and reporting

### Additional Features
- ✅ About Us page with company information
- ✅ Gallery showcase
- ✅ Professional footer with links
- ✅ Secure authentication flow
- ✅ Role-based access control

---

## 🛠 Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 19.2.0 |
| **Vite** | Build tool and dev server | 7.2.4 |
| **TailwindCSS** | Utility-first CSS framework | 4.1.18 |
| **React Router DOM** | Client-side routing | 7.10.1 |
| **Axios** | HTTP client | 1.13.2 |
| **React Hot Toast** | Toast notifications | 2.6.0 |
| **React Icons** | Icon library | 5.5.0 |
| **Google OAuth** | Google authentication | 0.13.4 |
| **Supabase** | Cloud storage for images | 2.89.0 |
| **ESLint** | Code linting | 9.39.1 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Running backend API (see [backend README](https://github.com/nisal-G/kv-audio-backend#))
- Google OAuth credentials (for Google login)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kv-audio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
kv-audio-frontend/
├── public/                    # Static assets
│   ├── KV_Audio_Logo.png     # Company logo
│   ├── home-hero.png         # Hero section images
│   └── ...
├── src/
│   ├── assets/               # Dynamic assets
│   ├── components/           # Reusable components
│   │   ├── Footer/          # Footer component
│   │   ├── header.jsx       # Navigation header
│   │   ├── mobileNavPannel.jsx  # Mobile navigation
│   │   ├── productCard.jsx  # Product card component
│   │   ├── bookingItem.jsx  # Booking item component
│   │   └── imageSlider.jsx  # Image carousel
│   ├── pages/               # Page components
│   │   ├── home/            # Home page modules
│   │   │   ├── homePage.jsx       # Main home layout
│   │   │   ├── home.jsx           # Hero & reviews
│   │   │   ├── items.jsx          # Product listing
│   │   │   ├── productOverview.jsx # Product details
│   │   │   ├── bookingPage.jsx    # Rental booking
│   │   │   ├── aboutUs.jsx        # About page
│   │   │   ├── contactUs.jsx      # Contact page
│   │   │   └── gallery.jsx        # Gallery page
│   │   ├── login/           # Authentication
│   │   │   └── login.jsx
│   │   ├── register/        # User registration
│   │   │   └── register.jsx
│   │   ├── verifyEmail/     # Email verification
│   │   │   └── verifyEmail.jsx
│   │   └── admin/           # Admin panel
│   │       ├── adminPage.jsx      # Admin dashboard
│   │       ├── adminItemsPage.jsx # Product management
│   │       ├── addItemPage.jsx    # Add new product
│   │       ├── updateItemsPage.jsx # Update product
│   │       ├── adminBookingPage.jsx # Order management
│   │       ├── adminReviewsPage.jsx # Review moderation
│   │       └── adminUsersPage.jsx  # User management
│   ├── utils/               # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND_URL` | Backend API base URL | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes (for Google login) |

> **Note**: All environment variables in Vite must be prefixed with `VITE_` to be exposed to the client.

### Vite Configuration

The `vite.config.js` file includes:
- React plugin for Fast Refresh
- Dev server configuration
- Build optimizations

### Routing Configuration

Routes are defined in `App.jsx`:
- `/` - Home page with nested routes
- `/login` - User login
- `/register` - User registration
- `/verify-email` - Email verification
- `/admin/*` - Admin dashboard and sub-routes

---

## 🔐 Authentication

### Authentication Flow

1. **Registration**
   - User fills registration form
   - Email verification OTP sent
   - User verifies email
   - Account activated

2. **Login**
   - Email/password authentication
   - Google OAuth (alternative)
   - JWT token received
   - Token stored in localStorage
   - User redirected based on role

3. **Protected Routes**
   - Token verification on protected pages
   - Automatic redirect to login if unauthenticated
   - Role-based access control
   - Admin routes protected

### Token Management

```javascript
// Token is stored in localStorage
localStorage.setItem('token', jwtToken);

// Token is sent with API requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### User Roles

- **Customer**: Access to public pages, booking, and reviews
- **Admin**: Full access to admin panel and all features

---

## 🚀 Deployment

### Vercel Deployment

The application is configured for Vercel deployment with `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures proper routing for the SPA.

### Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard

### Production Considerations

- ✅ Environment variables properly set
- ✅ Backend API URL updated to production
- ✅ CORS configured on backend
- ✅ Google OAuth redirect URLs updated
- ✅ SSL/HTTPS enabled
- ✅ Static assets optimized
- ✅ Code splitting enabled

---

## 🧪 Development

### Development Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Quality

- **ESLint**: Enforces code quality and consistency
- **React Hooks Rules**: Ensures proper hook usage
- **React Refresh**: Hot module replacement during development

### Best Practices

- Component-based architecture
- Separation of concerns (pages, components, utils)
- Responsive design with mobile-first approach
- Accessibility considerations
- Clean and maintainable code
- Proper error handling
- Toast notifications for user feedback

---

## 🎨 UI/UX Design Principles

### Design System
- **Modern Aesthetic**: Clean, professional, and premium look
- **Color Palette**: Carefully curated colors with gradients
- **Typography**: Google Fonts for modern appearance
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and micro-interactions

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactive elements
- Optimized images for different screen sizes

### User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Consistent layout across pages
- Loading states and feedback
- Error handling with helpful messages

---

## 📄 License

This project is proprietary and confidential.

---

## 🔗 Related Projects

- [KV Audio Backend API](https://github.com/nisal-G/kv-audio-backend#)

---

## 👥 Support

For support or inquiries:
- Submit an inquiry through the Contact Us page
- Contact me directly

---

## 🔄 Version History

- **v1.0.0** - Initial release
  - Complete user authentication system
  - Product catalog and booking system
  - Admin dashboard and management tools
  - Review and inquiry systems
  - Mobile-responsive design
  - Google OAuth integration

---

**Developed with ❤️ by Nisal Gunathilaka**
