'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
import { useState } from 'react';

// Animation variants
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

const scaleOnHover = {
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.2 } 
  }
};

// Data for sections
const aboutCards = [
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
];

const features = [
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
];

const howItWorksSteps = [
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
];

const stats = [
  { number: '95%', label: 'AI Accuracy', icon: Target },
  { number: '50K+', label: 'Active Users', icon: Users },
  { number: '500+', label: 'Healthcare Partners', icon: Shield },
  { number: '1M+', label: 'Pain Assessments', icon: Activity }
];

const testimonials = [
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
];

// Animation hook
function useAnimationInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return [ref, isInView];
}

export function ComprehensiveHomePage() {
  const [heroRef, heroInView] = useAnimationInView();
  const [aboutRef, aboutInView] = useAnimationInView();
  const [featuresRef, featuresInView] = useAnimationInView();
  const [howItWorksRef, howItWorksInView] = useAnimationInView();
  const [statsRef, statsInView] = useAnimationInView();
  const [testimonialsRef, testimonialsInView] = useAnimationInView();
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 blur-3xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 blur-3xl opacity-60"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column - Text */}
            <motion.div variants={fadeInUp} className="text-left lg:text-left">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-8 shadow-sm"
              >
                <Zap className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm font-medium text-green-800">AI-Powered Healthcare Revolution</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900"
              >
                Transforming
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Cancer Pain Care
                </span>
                with AI Intelligence
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              >
                Revolutionary AI platform that predicts, monitors, and manages cancer pain 
                with unprecedented accuracy. Empowering patients and healthcare providers 
                with intelligent insights for better outcomes.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <motion.div whileHover="hover" variants={scaleOnHover}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg group"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <motion.div whileHover="hover" variants={scaleOnHover}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg rounded-xl border-2 border-gray-300 hover:border-gray-400 group bg-white shadow-lg"
                  >
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-6 text-sm text-gray-500"
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
            </motion.div>

            {/* Right Column - Healthcare Illustration */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-2xl opacity-30"></div>
                <Card className="relative border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                        <Heart className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">AI-Powered Healthcare</h3>
                      
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Transforming cancer pain management with intelligent predictions and personalized care.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">95%</div>
                            <div className="text-xs text-gray-500">Accuracy</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">50K+</div>
                            <div className="text-xs text-gray-500">Users</div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* About the Platform Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
              About Our Platform
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're on a mission to revolutionize cancer pain management through artificial intelligence, 
              providing healthcare providers and patients with the tools they need for better outcomes.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover="hover"
              >
                <motion.div variants={scaleOnHover}>
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg">
                        <card.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                      <p className="text-base text-gray-600 leading-relaxed">{card.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
              Key Features
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive suite of AI-powered tools designed to enhance cancer pain management and improve patient outcomes
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover="hover"
              >
                <motion.div variants={scaleOnHover}>
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
              How It Works
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 max-w-3xl mx-auto">
              Simple, streamlined process from registration to treatment optimization
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="relative"
          >
            {/* Timeline */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 to-emerald-200"></div>
            
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Step Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl font-bold text-green-600 mr-4">{step.step}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>

                {/* Step Visual */}
                <div className={`${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact/Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-6">
              Our Impact in Numbers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from healthcare providers and patients worldwide
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover="hover"
              >
                <motion.div 
                  variants={scaleOnHover}
                  className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center mb-6 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hear from healthcare professionals and patients who are transforming care with our platform
            </motion.p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto"
          >
            {/* Testimonial Carousel */}
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="shadow-2xl border-0 bg-white">
                      <CardContent className="p-12 text-center">
                        <Quote className="w-12 h-12 text-green-500 mx-auto mb-6" />
                        <div className="flex items-center justify-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-lg text-gray-600 mb-8 italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-4 shadow-lg">
                            <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-gray-900">{testimonial.name}</div>
                            <div className="text-gray-600">{testimonial.role}</div>
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
                className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 hover:border-gray-400"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 hover:border-gray-400"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{
              background: [
                "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                "linear-gradient(225deg, #8b5cf6, #3b82f6)",
                "linear-gradient(45deg, #3b82f6, #8b5cf6)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of healthcare providers and patients who are already experiencing 
              better outcomes with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.div whileHover="hover" variants={scaleOnHover}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 text-lg rounded-xl shadow-2xl group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div whileHover="hover" variants={scaleOnHover}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-4 text-lg rounded-xl border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
