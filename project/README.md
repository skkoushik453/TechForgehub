# TechForge - Student Project Platform

A modern, responsive platform for selling premium student projects across various technologies including AI/ML, Web Development, Full-Stack, Mobile Apps, and more.

## Features

- **Modern Design**: Clean, professional UI with gradient backgrounds and smooth animations
- **Project Categories**: AI/ML, Web Development, Full-Stack, Mobile Apps, Database, Cybersecurity
- **Contact Form**: Integrated form that sends inquiries directly to email
- **Data Storage**: JSON-based database for storing inquiries
- **Responsive**: Mobile-first design that works on all devices
- **Email Integration**: Automatic email notifications for new inquiries

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, Nodemailer
- **Database**: JSON file storage
- **Build Tool**: Vite

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
# For email functionality
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

3. Start the development server:
```bash
npm run dev
```

4. In a separate terminal, start the backend server:
```bash
cd server
npm install
npm start
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Project categories
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── App.tsx             # Main app component
└── main.tsx            # Entry point

server/
├── index.js            # Express server
└── package.json        # Server dependencies

data/
└── inquiries.json      # Stored inquiries
```

## Email Configuration

To enable email functionality:

1. Use Gmail with an App Password
2. Set environment variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password

All inquiries will be sent to: `9921004349@klu.ac.in`

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider
3. Deploy the `server` folder to a Node.js hosting service

## Customization

- Update contact email in `server/index.js`
- Modify project categories in `Projects.tsx`
- Change branding in `Header.tsx` and `Footer.tsx`
- Adjust colors in Tailwind classes throughout components