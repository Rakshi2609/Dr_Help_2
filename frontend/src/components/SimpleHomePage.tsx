'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { 
  ArrowRight, 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Activity, 
  Award,
  ChevronDown,
  Play,
  Star,
  CheckCircle,
  TrendingUp,
  Brain,
  Monitor,
  Database,
  Clock,
  Target,
  Eye,
  UserCheck,
  BarChart3,
  Stethoscope,
  Microscope,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function SimpleHomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { theme } = useTheme();
  
  // Move data arrays inside component to ensure they're available
  const [aboutCards] = useState([
    {
      icon: Brain,
      title: "Why AI?",
      description: "Leverage cutting-edge machine learning algorithms to predict and prevent health issues before they become critical."
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our AI models achieve 95%+ accuracy in pain assessment and prediction, backed by extensive clinical validation."
    },
    {
      icon: Eye,
      title: "Early Detection",
      description: "Detect patterns and anomalies in health data weeks before traditional methods, enabling proactive care."
    }
  ]);

  const [features] = useState([
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced algorithms analyze patient data to predict pain episodes and treatment outcomes.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Monitor,
      title: "User-Friendly Dashboard",
      description: "Intuitive interface designed for both patients and healthcare providers with real-time insights.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Database,
      title: "Secure Data Handling",
      description: "Enterprise-grade security with HIPAA compliance ensuring your medical data stays protected.",
      color: "from-green-600 to-teal-600"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with instant alerts for critical changes in patient condition.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless communication tools connecting patients, doctors, and care coordinators.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track treatment progress and outcomes.",
      color: "from-blue-500 to-indigo-500"
    }
  ]);

  const [howItWorksSteps] = useState([
    {
      step: "01",
      icon: UserCheck,
      title: "Patient Registration",
      description: "Simple onboarding process with secure data collection and health history assessment."
    },
    {
      step: "02",
      icon: Stethoscope,
      title: "AI Assessment",
      description: "Our AI analyzes patient data, symptoms, and medical history to create personalized insights."
    },
    {
      step: "03",
      icon: Microscope,
      title: "Continuous Monitoring",
      description: "Real-time tracking of health metrics with intelligent alerts and recommendations."
    },
    {
      step: "04",
      icon: Heart,
      title: "Treatment Optimization",
      description: "AI-driven treatment suggestions and continuous optimization based on patient response."
    }
  ]);

  const [stats] = useState([
    { number: '95%', label: 'AI Accuracy', icon: Target },
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '500+', label: 'Healthcare Partners', icon: Shield },
    { number: '1M+', label: 'Pain Assessments', icon: Activity }
  ]);

  const [testimonials] = useState([
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Oncologist, Mayo Clinic',
      content: 'PainSense has revolutionized how we approach cancer pain management. The AI predictions are remarkably accurate and have helped us intervene before critical pain episodes.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Cancer Survivor',
      content: 'This platform gave me hope during my darkest moments. Being able to track my pain and see the patterns helped both me and my doctors provide better care.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pain Management Specialist',
      content: 'The real-time monitoring capabilities have improved our response time significantly. We can now provide proactive care instead of reactive treatment.',
      rating: 5,
      avatar: 'ER'
    },
    {
      name: 'Lisa Thompson',
      role: 'Registered Nurse',
      content: 'The interface is incredibly intuitive. Our nursing staff adapted quickly, and the AI insights have made our patient care more efficient and effective.',
      rating: 5,
      avatar: 'LT'
    }
  ]);

  useEffect(() => {
    setMounted(true);
    // Simulate data loading
    const timer = setTimeout(() => {
      setDataLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Show loading state until both mounting and data are ready
  if (!mounted || !dataLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">Loading Healthcare Platform...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Preparing your AI-powered experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 blur-3xl opacity-60"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 blur-3xl opacity-60"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-left lg:text-left">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8 shadow-sm"
                variants={fadeInUp}
              >
                <Zap className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">AI-Powered Healthcare Revolution</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
                variants={fadeInUp}
              >
                Transforming
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Cancer Pain Care
                </span>
                with AI Intelligence
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                variants={fadeInUp}
              >
                Revolutionary AI platform that predicts, monitors, and manages cancer pain 
                with unprecedented accuracy. Empowering patients and healthcare providers 
                with intelligent insights for better outcomes.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                variants={fadeInUp}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 group bg-white dark:bg-gray-800 shadow-lg"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
                variants={fadeInUp}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
                  <span>50K+ Users</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Healthcare Illustration */}
            <motion.div 
              className="relative"
              variants={fadeInUp}
            >
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-900/50 dark:to-blue-900/50 rounded-3xl blur-2xl opacity-30"></div>
                <Card className="relative shadow-2xl border-0 bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Health Monitor</h3>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Pain Level</span>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">Low Risk</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 2, delay: 1 }}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Treatment Progress</span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "92%" }}
                              transition={{ duration: 2, delay: 1.5 }}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Patient Wellbeing</span>
                            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">Excellent</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: "88%" }}
                              transition={{ duration: 2, delay: 2 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </motion.section>

      {/* About the Platform Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900 min-h-[600px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Our Platform
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to revolutionize cancer pain management through artificial intelligence, 
              providing healthcare providers and patients with the tools they need for better outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800 min-h-[700px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Key Features
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive suite of AI-powered tools designed to enhance cancer pain management and improve patient outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-700 group">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900 min-h-[800px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Simple, streamlined process from registration to treatment optimization
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800"></div>
            
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                {/* Step Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl font-bold text-green-600 dark:text-green-400 mr-4">{step.step}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

                {/* Step Visual */}
                <div className={`${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-inner">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact/Stats Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black min-h-[600px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from healthcare providers and patients worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800 min-h-[600px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from healthcare providers and patients who trust our platform
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                variants={fadeInUp}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white dark:bg-gray-700">
                      <CardContent className="p-12 text-center">
                        <Quote className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-6" />
                        <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="flex items-center justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</div>
                            <div className="text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-green-500 dark:bg-green-400' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Footer */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-r from-green-500 to-emerald-500" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={fadeInUp}
          >
            Get Started Today
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Join thousands of healthcare providers and patients who are already experiencing 
            better outcomes with our AI-powered platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            variants={fadeInUp}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 text-lg rounded-xl shadow-2xl group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12 py-4 text-lg rounded-xl border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl"
            >
              Schedule Demo
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center space-x-8 text-sm text-gray-400"
            variants={fadeInUp}
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              HIPAA compliant
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
