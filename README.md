# Dynamic Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring a complete admin panel for content management.

## 🌟 Features

### Frontend
- **Modern Design**: Beautiful, responsive UI with dark theme and gradient backgrounds
- **Smooth Animations**: Engaging user experience with smooth transitions
- **Responsive Layout**: Works perfectly on all devices
- **SEO Optimized**: Built with Next.js for excellent performance and SEO

### Admin Panel
- **Complete CRUD Operations**: Manage all portfolio content
- **Authentication**: Secure login system with NextAuth.js
- **Dashboard**: Overview of portfolio statistics and quick actions
- **Content Management**: 
  - Profile information
  - Projects with images and technologies
  - Skills with proficiency levels
  - Work experience
  - Contact messages
  - Blog posts (future feature)

### Sections
- **Hero Section**: Attractive introduction with profile image and social links
- **About Section**: Personal information and contact details
- **Projects Section**: Showcase of featured and other projects
- **Skills Section**: Technical skills organized by category
- **Experience Section**: Professional work history timeline
- **Contact Section**: Contact form with message management

## 🚀 Technologies Used

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom gradients

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="admin123"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:generate
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Portfolio: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 🔐 Admin Access

Default admin credentials:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## 📖 Usage

### Managing Content

1. **Login to Admin Panel**
   - Go to `/admin/login`
   - Use the default credentials or your custom ones

2. **Update Profile**
   - Navigate to Profile section
   - Update personal information, contact details, and social links

3. **Manage Projects**
   - Add new projects with descriptions, technologies, and links
   - Mark projects as featured to highlight them
   - Upload project images and add multiple screenshots

4. **Update Skills**
   - Add technical skills organized by categories
   - Set proficiency levels (1-5 scale)
   - Add icons and colors for visual appeal

5. **Add Experience**
   - Document work history with detailed descriptions
   - Include technologies used and company information
   - Set current position and employment dates

6. **View Messages**
   - Check contact form submissions
   - Mark messages as read/replied
   - Respond to potential client inquiries

### Customization

The portfolio is designed to be easily customizable:

- **Colors**: Update Tailwind CSS classes for different color schemes
- **Layout**: Modify section components in `/src/components/sections/`
- **Content**: All content is managed through the admin panel
- **Styling**: Customize styles in component files or global CSS

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic SSL and CDN

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── page.tsx           # Main portfolio page
├── components/
│   ├── admin/             # Admin panel components
│   ├── layout/            # Layout components (Navbar, Footer)
│   └── sections/          # Page sections (Hero, About, etc.)
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions

prisma/
├── schema.prisma          # Database schema
└── seed.ts               # Database seeder

```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the developer

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
