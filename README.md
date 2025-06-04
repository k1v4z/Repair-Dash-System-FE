# Repair Dashboard

A repair management dashboard application built with React, TypeScript, and modern technologies.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Tailwind Animate
- **UI Components**: Shadcn/ui + Radix UI
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Carousel**: Swiper.js + Embla Carousel
- **Date Handling**: date-fns
- **Data Tables**: TanStack Table
- **Icons**: Lucide React + Heroicons
- **Notifications**: React Toastify
- **File Processing**: XLSX

## 📋 System Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 or **yarn**: >= 1.22.0

## 🛠️ Installation

### 1. Clone repository

```bash
git clone git@github.com:k1v4z/Repair-Dash-System-FE.git
cd repair-dash
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Environment Configuration (if applicable)

Create `.env` file based on `.env.example` (if exists):

```bash
cp .env.example .env.local
```

Then edit the environment variables in `.env` according to your configuration.

# API Configuration. Ex: http://localhost:5000/api/v1

VITE_API_URL='YOUR_API_URL'
\*\*Ex: VITE_API_URL='http://localhost:5000/api/v1'

## 🚀 Running the Application

### Development mode

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will run at: `http://localhost:3000`

### Build production

```bash
npm run build
```

or

```bash
yarn build
```

### Preview build

```bash
npm run preview
```

or

```bash
yarn preview
```

### Lint code

```bash
npm run lint
```

or

```bash
yarn lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common components
│   └── ui/             # Shadcn UI components
├── pages/              # Application pages
├── layouts/            # Layout components
├── features/           # Business logic by module
│   ├── [module]/
│   │   ├── api/        # API calls
│   │   ├── hooks/      # Custom hooks
│   │   ├── service/    # Business logic
│   │   └── types/      # Type definitions
├── routes/             # Routing configuration
├── hooks/              # Global custom hooks
├── utils/              # Utility functions
├── types/              # Global type definitions
├── schemas/            # Zod validation schemas
├── stores/             # Zustand stores
├── constants/          # Constants
├── config/             # Configuration files
├── styles/             # Global styles
├── assets/             # Static assets
└── lib/                # Library configurations
```

## 🎨 Styling Guidelines

- Use **TailwindCSS** for styling
- UI Components from **Shadcn/ui**
- Animation with **Framer Motion**
- Icons from **Lucide React** and **Heroicons**

## 📝 Development Guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductList`)
- **Files**: kebab-case (e.g., `product-list.tsx`)
- **Variables/Functions**: camelCase (e.g., `fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Custom Hooks**: Start with "use" (e.g., `useAuth`)

### Code Style

- Use early returns
- Event handlers have "handle" prefix (e.g., `handleClick`)
- Prefer const arrow functions
- Always define types when possible

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run linting checks       |

## 📚 Documentation References

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

[Add license information here]

---

**Note**: Make sure you have Node.js and npm/yarn installed before getting started. If you encounter any issues during installation or running the application, please check the console logs for more details.
