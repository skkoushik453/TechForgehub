import React from 'react';
import { motion } from 'framer-motion';
import { Code, Mail, MapPin, Sparkles } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "AI/ML Projects", href: "#projects" },
        { name: "Web Development", href: "#projects" },
        { name: "Mobile Apps", href: "#projects" },
        { name: "Custom Projects", href: "#contact" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" }
      ]
    }
  ];

  const contactInfo = [
    { icon: Mail, text: "techforge81@gmail.com" },
    { icon: MapPin, text: "Available Worldwide" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-2 rounded-xl"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #2563eb, #7c3aed, #ec4899)",
                      "linear-gradient(45deg, #7c3aed, #ec4899, #2563eb)",
                      "linear-gradient(45deg, #ec4899, #2563eb, #7c3aed)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Code className="h-6 w-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                </motion.div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TechForge
              </span>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with premium projects across AI/ML, Web Development, 
              Mobile Apps, and more. Your success is our mission.
            </p>
          </motion.div>
          
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors relative"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon className="h-4 w-4 text-blue-400" />
                  </motion.div>
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="border-t border-gray-700 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm text-gray-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            &copy; 2024 TechForge. All rights reserved. Crafted with{' '}
            <motion.span
              className="text-red-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            {' '}for student success.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;