import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Globe, Layers, Smartphone, Database, Shield, X, ExternalLink, Code, IndianRupee, Clock, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  difficulty: string;
  price: string;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      id: 'ai-ml',
      icon: <Brain className="h-8 w-8 text-pink-500" />,
      title: "AI/ML Projects",
      description: "Machine Learning models, Deep Learning, Computer Vision, NLP projects",
      projects: "150+ Projects",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50"
    },
    {
      id: 'web-development',
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Web Development",
      description: "Frontend, Backend, Full-stack web applications with modern frameworks",
      projects: "200+ Projects",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      id: 'full-stack',
      icon: <Layers className="h-8 w-8 text-purple-500" />,
      title: "Full-Stack Apps",
      description: "Complete web applications with database integration and authentication",
      projects: "120+ Projects",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50"
    },
    {
      id: 'mobile-apps',
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      projects: "80+ Projects",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      id: 'database',
      icon: <Database className="h-8 w-8 text-orange-500" />,
      title: "Database Projects",
      description: "Database design, management systems, and data analytics projects",
      projects: "90+ Projects",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      id: 'cybersecurity',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Cybersecurity",
      description: "Security tools, ethical hacking, and cybersecurity applications",
      projects: "60+ Projects",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50"
    }
  ];

  const fetchProjects = async (categoryId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${categoryId}`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProjects = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchProjects(categoryId);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setProjects([]);
  };

  const handleGetProject = () => {
    closeModal();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-10"
          animate={{
            scale: [1, 0.7, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Explore Categories</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Project Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of projects across different technologies and domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className={`p-6 bg-gradient-to-br ${category.bgColor} relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <motion.div
                        className="flex-shrink-0 p-3 bg-white rounded-xl shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {category.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{category.projects}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    <motion.button 
                      onClick={() => handleViewProjects(category.id)}
                      className={`w-full bg-gradient-to-r ${category.color} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Projects
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-200">
            <p className="text-gray-600 mb-6 text-lg">
              Can't find what you're looking for? We create custom projects too!
            </p>
            <motion.a
              href="#contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Custom Project
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Projects Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.title} Projects
                </h3>
                <motion.button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <motion.div
                      className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={itemVariants}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 flex-1 leading-tight">{project.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)} ml-2`}>
                            {project.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Code className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Technologies:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <motion.span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-4 w-4 text-green-600" />
                            <span className="text-lg font-bold text-green-600">{project.price}</span>
                          </div>
                          <motion.button
                            onClick={handleGetProject}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Get Project</span>
                            <ExternalLink className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {!loading && projects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No projects found for this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
