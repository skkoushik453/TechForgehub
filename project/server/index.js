import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app build
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Email configuration
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  // Verify email configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email configuration error:', error.message);
      console.log('💡 Please check your EMAIL_USER and EMAIL_PASS in .env file');
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} else {
  console.log('⚠️ Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
}

// Store inquiry data
const storeInquiry = (data) => {
  const inquiriesFile = path.join(dataDir, 'inquiries.json');
  let inquiries = [];
  
  if (fs.existsSync(inquiriesFile)) {
    try {
      const fileContent = fs.readFileSync(inquiriesFile, 'utf8');
      inquiries = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading inquiries file:', error);
    }
  }
  
  const inquiry = {
    id: Date.now().toString(),
    ...data,
    timestamp: new Date().toISOString()
  };
  
  inquiries.push(inquiry);
  
  try {
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2));
    return inquiry;
  } catch (error) {
    console.error('Error writing inquiries file:', error);
    throw error;
  }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, budget, timeline, requirements } = req.body;
    
    // Store inquiry in JSON file
    const inquiry = storeInquiry({
      name,
      email,
      projectType,
      budget,
      timeline,
      requirements
    });
    
    console.log('📝 New inquiry saved:', {
      id: inquiry.id,
      name,
      email,
      projectType,
      timestamp: inquiry.timestamp
    });
    
    // Try to send email notification if configured
    if (transporter) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'techforge81@gmail.com',
          subject: `🚀 New Project Inquiry - ${projectType}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Project Inquiry</h1>
                <p style="color: #e0e7ff; margin: 10px 0 0 0;">TechForge Student Projects</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">👤 Client Information</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Name:</strong> 
                  <span style="color: #1f2937; margin-left: 10px;">${name}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Email:</strong> 
                  <a href="mailto:${email}" style="color: #2563eb; margin-left: 10px; text-decoration: none;">${email}</a>
                </div>
                
                <h2 style="color: #1f2937; margin-top: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">📋 Project Details</h2>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Project Type:</strong> 
                  <span style="background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 14px; margin-left: 10px;">${projectType}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Budget:</strong> 
                  <span style="color: #059669; margin-left: 10px; font-weight: 600;">${budget || 'Not specified'}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #374151;">Timeline:</strong> 
                  <span style="color: #dc2626; margin-left: 10px; font-weight: 600;">${timeline || 'Not specified'}</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #374151; display: block; margin-bottom: 10px;">Requirements:</strong>
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; line-height: 1.6;">
                    ${requirements.replace(/\n/g, '<br>')}
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border: 1px solid #0ea5e9;">
                  <h3 style="color: #0c4a6e; margin: 0 0 15px 0;">📊 Inquiry Information</h3>
                  <p style="margin: 5px 0; color: #0369a1;"><strong>Inquiry ID:</strong> ${inquiry.id}</p>
                  <p style="margin: 5px 0; color: #0369a1;"><strong>Submitted:</strong> ${new Date(inquiry.timestamp).toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}</p>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                  <a href="mailto:${email}" style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                    📧 Reply to Client
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
                <p>🔒 This inquiry was securely submitted through TechForge Student Projects platform</p>
                <p style="margin-top: 10px;">
                  <a href="mailto:techforge81@gmail.com" style="color: #2563eb; text-decoration: none;">techforge81@gmail.com</a>
                </p>
              </div>
            </div>
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to techforge81@gmail.com');
      } catch (emailError) {
        console.log('❌ Email sending failed:', emailError.message);
        if (emailError.code === 'EAUTH') {
          console.log('💡 Authentication failed. Please check your Gmail App Password');
        }
      }
    } else {
      console.log('📧 Email not sent - configuration missing');
    }
    
    res.json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry.id
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
});

// Get projects by category endpoint
app.get('/api/projects/:category', (req, res) => {
  const { category } = req.params;
  
  const projectDatabase = {
    'ai-ml': [
      {
        id: 1,
        title: "Smart Recommendation System",
        description: "AI-powered product recommendation engine using collaborative filtering and matrix factorization techniques",
        technologies: ["Python", "TensorFlow", "Pandas", "Flask", "Redis"],
        difficulty: "Advanced",
        price: "₹1,299"
      },
      {
        id: 2,
        title: "Computer Vision Object Detection",
        description: "Real-time object detection system using YOLO algorithm with custom dataset training",
        technologies: ["Python", "OpenCV", "PyTorch", "YOLO", "CUDA"],
        difficulty: "Expert",
        price: "₹1,899"
      },
      {
        id: 3,
        title: "Natural Language Processing Chatbot",
        description: "Intelligent chatbot with sentiment analysis, intent recognition, and context awareness",
        technologies: ["Python", "NLTK", "spaCy", "Transformers", "FastAPI"],
        difficulty: "Advanced",
        price: "₹1,599"
      },
      {
        id: 4,
        title: "Predictive Analytics Dashboard",
        description: "Machine learning model for sales forecasting with interactive dashboard and real-time updates",
        technologies: ["Python", "Scikit-learn", "Plotly", "Streamlit", "PostgreSQL"],
        difficulty: "Intermediate",
        price: "₹1,199"
      },
      {
        id: 5,
        title: "Medical Image Classification",
        description: "Deep learning model for medical image classification with 95%+ accuracy",
        technologies: ["Python", "TensorFlow", "Keras", "CNN", "Medical Imaging"],
        difficulty: "Advanced",
        price: "₹1,499"
      }
    ],
    'web-development': [
      {
        id: 6,
        title: "E-commerce Platform",
        description: "Full-featured online store with payment integration, inventory management, and admin dashboard",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
        difficulty: "Advanced",
        price: "₹1,799"
      },
      {
        id: 7,
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management with real-time metrics and scheduling",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js", "Socket.io"],
        difficulty: "Intermediate",
        price: "₹1,299"
      },
      {
        id: 8,
        title: "Real Estate Website",
        description: "Property listing platform with advanced search, filters, and virtual tours",
        technologies: ["React", "Next.js", "Prisma", "Tailwind", "Maps API"],
        difficulty: "Intermediate",
        price: "₹1,199"
      },
      {
        id: 9,
        title: "Learning Management System",
        description: "Online education platform with course management, video streaming, and progress tracking",
        technologies: ["Angular", "Node.js", "MySQL", "Socket.io", "Video.js"],
        difficulty: "Advanced",
        price: "₹1,999"
      },
      {
        id: 10,
        title: "Portfolio Website Builder",
        description: "Drag-and-drop portfolio builder for creatives with template library",
        technologies: ["React", "Firebase", "Material-UI", "Framer Motion"],
        difficulty: "Intermediate",
        price: "₹999"
      }
    ],
    'full-stack': [
      {
        id: 11,
        title: "Task Management App",
        description: "Collaborative project management tool with real-time updates, file sharing, and team chat",
        technologies: ["MERN Stack", "Socket.io", "Redux", "JWT", "AWS S3"],
        difficulty: "Advanced",
        price: "₹1,599"
      },
      {
        id: 12,
        title: "Food Delivery Platform",
        description: "Complete food ordering system with restaurant admin panel, delivery tracking, and payments",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Google Maps"],
        difficulty: "Expert",
        price: "₹1,999"
      },
      {
        id: 13,
        title: "Inventory Management System",
        description: "Business inventory tracking with analytics, barcode scanning, and automated reordering",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Redis", "Chart.js"],
        difficulty: "Advanced",
        price: "₹1,899"
      },
      {
        id: 14,
        title: "Event Booking Platform",
        description: "Event management and ticket booking system with QR codes and seat selection",
        technologies: ["React", "Node.js", "MongoDB", "PayPal", "QR Generator"],
        difficulty: "Advanced",
        price: "₹1,799"
      },
      {
        id: 15,
        title: "Healthcare Management System",
        description: "Patient management system for clinics with appointment scheduling and medical records",
        technologies: ["Angular", "Spring Boot", "MySQL", "JWT", "PDF Generator"],
        difficulty: "Expert",
        price: "₹1,999"
      }
    ],
    'mobile-apps': [
      {
        id: 16,
        title: "Fitness Tracking App",
        description: "Cross-platform fitness app with workout plans, progress tracking, and social features",
        technologies: ["React Native", "Firebase", "Redux", "Maps", "HealthKit"],
        difficulty: "Advanced",
        price: "₹1,899"
      },
      {
        id: 17,
        title: "Expense Tracker",
        description: "Personal finance management mobile app with budget planning and expense categorization",
        technologies: ["Flutter", "Dart", "SQLite", "Charts", "Camera"],
        difficulty: "Intermediate",
        price: "₹1,299"
      },
      {
        id: 18,
        title: "Recipe Sharing App",
        description: "Social cooking app with recipe sharing, meal planning, and shopping lists",
        technologies: ["React Native", "Node.js", "MongoDB", "Camera", "Push Notifications"],
        difficulty: "Advanced",
        price: "₹1,799"
      },
      {
        id: 19,
        title: "Language Learning App",
        description: "Interactive language learning with gamification, speech recognition, and progress tracking",
        technologies: ["Flutter", "Firebase", "Audio", "Animations", "Speech API"],
        difficulty: "Advanced",
        price: "₹1,999"
      },
      {
        id: 20,
        title: "Weather Forecast App",
        description: "Beautiful weather app with location services, widgets, and severe weather alerts",
        technologies: ["React Native", "Weather API", "Maps", "Push", "Widgets"],
        difficulty: "Intermediate",
        price: "₹999"
      }
    ],
    'database': [
      {
        id: 21,
        title: "Library Management System",
        description: "Complete library database with book tracking, member management, and fine calculation",
        technologies: ["MySQL", "PHP", "Bootstrap", "CRUD", "Reports"],
        difficulty: "Intermediate",
        price: "₹899"
      },
      {
        id: 22,
        title: "Student Information System",
        description: "University student database management with grades, attendance, and transcript generation",
        technologies: ["PostgreSQL", "Python", "Django", "Reports", "PDF"],
        difficulty: "Advanced",
        price: "₹1,299"
      },
      {
        id: 23,
        title: "Hospital Database System",
        description: "Patient and staff management database with appointment scheduling and billing",
        technologies: ["Oracle", "Java", "JDBC", "Triggers", "Stored Procedures"],
        difficulty: "Advanced",
        price: "₹1,599"
      },
      {
        id: 24,
        title: "E-commerce Database Design",
        description: "Scalable database for online retail with product catalog, orders, and analytics",
        technologies: ["MongoDB", "Indexing", "Aggregation", "Sharding", "Performance"],
        difficulty: "Expert",
        price: "₹1,899"
      },
      {
        id: 25,
        title: "Banking System Database",
        description: "Secure banking database with transactions, account management, and audit trails",
        technologies: ["SQL Server", "Stored Procedures", "Security", "Backup", "Encryption"],
        difficulty: "Expert",
        price: "₹1,999"
      }
    ],
    'cybersecurity': [
      {
        id: 26,
        title: "Network Security Scanner",
        description: "Vulnerability assessment tool for networks with automated reporting and remediation suggestions",
        technologies: ["Python", "Nmap", "Scapy", "Tkinter", "Threading"],
        difficulty: "Advanced",
        price: "₹1,799"
      },
      {
        id: 27,
        title: "Password Strength Analyzer",
        description: "Tool to analyze and improve password security with entropy calculation and suggestions",
        technologies: ["Python", "Regex", "Entropy", "GUI", "Cryptography"],
        difficulty: "Intermediate",
        price: "₹999"
      },
      {
        id: 28,
        title: "Intrusion Detection System",
        description: "Real-time network intrusion detection with machine learning and alert system",
        technologies: ["Python", "Machine Learning", "Wireshark", "Alerts", "Logging"],
        difficulty: "Expert",
        price: "₹1,999"
      },
      {
        id: 29,
        title: "Encryption/Decryption Tool",
        description: "File encryption tool with multiple algorithms and digital signature verification",
        technologies: ["Java", "AES", "RSA", "Digital Signatures", "Key Management"],
        difficulty: "Advanced",
        price: "₹1,499"
      },
      {
        id: 30,
        title: "Web Application Security Tester",
        description: "Automated web app vulnerability scanner with OWASP compliance and detailed reports",
        technologies: ["Python", "Selenium", "OWASP", "Reports", "SQL Injection"],
        difficulty: "Expert",
        price: "₹1,999"
      }
    ]
  };
  
  const projects = projectDatabase[category] || [];
  res.json({ success: true, projects });
});

// Get all inquiries endpoint (for admin purposes)
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiriesFile = path.join(dataDir, 'inquiries.json');
    if (fs.existsSync(inquiriesFile)) {
      const fileContent = fs.readFileSync(inquiriesFile, 'utf8');
      const inquiries = JSON.parse(fileContent);
      res.json({ success: true, inquiries });
    } else {
      res.json({ success: true, inquiries: [] });
    }
  } catch (error) {
    console.error('Error reading inquiries:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiries' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 TechForge Server running on port ${PORT}`);
  console.log(`📧 Email configured for: techforge81@gmail.com`);
  console.log(`📁 Data directory: ${dataDir}`);
  console.log(`🌐 Serving frontend from: ${distPath}`);
  
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`✅ Email configured with: ${process.env.EMAIL_USER}`);
  } else {
    console.log(`⚠️ Email not configured. Create .env file with EMAIL_USER and EMAIL_PASS`);
  }
  
  console.log(`🔗 API endpoints:`);
  console.log(`   - POST /api/contact - Submit inquiry`);
  console.log(`   - GET /api/projects/:category - Get projects by category`);
  console.log(`   - GET /api/inquiries - View all inquiries`);
  console.log(`   - GET /api/health - Health check`);
  console.log(`   - GET /* - Serve React frontend`);
});
