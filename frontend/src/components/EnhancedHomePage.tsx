'use client';

import { motion } from 'framer-motion';
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
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Heart,
    title: 'Pain Assessment',
    description: 'Advanced AI-powered pain level monitoring and assessment for cancer patients.',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security ensuring your medical data stays protected.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Continuous health monitoring with instant alerts and notifications.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Care Team Collaboration',
    description: 'Seamless communication between patients, doctors, and caregivers.',
    color: 'from-purple-500 to-violet-500'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Machine learning algorithms provide personalized treatment recommendations.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Award,
    title: 'Evidence-Based Care',
    description: 'Treatment plans backed by latest medical research and best practices.',
    color: 'from-indigo-500 to-purple-500'
  }
];

const stats = [
  { number: '10K+', label: 'Patients Helped', icon: Users },
  { number: '500+', label: 'Healthcare Providers', icon: Shield },
  { number: '99.9%', label: 'Uptime Reliability', icon: TrendingUp },
  { number: '24/7', label: 'Support Available', icon: Heart }
];

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Oncologist',
    image: '/api/placeholder/64/64',
    content: 'PainSense has revolutionized how we monitor and manage cancer pain. The AI insights are incredibly accurate.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Cancer Survivor',
    image: '/api/placeholder/64/64',
    content: 'This platform helped me communicate my pain levels effectively to my care team. Game-changer!',
    rating: 5
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Pain Management Specialist',
    image: '/api/placeholder/64/64',
    content: 'The real-time monitoring capabilities have improved our response time significantly.',
    rating: 5
  }
];

const achievements = [
  { icon: Users, number: '50K+', label: 'Lives Improved' },
  { icon: Heart, number: '1M+', label: 'Pain Assessments' },
  { icon: Shield, number: '99.99%', label: 'Data Security' },
  { icon: Award, number: '500+', label: 'Healthcare Partners' }
];

const researchData = [
  { metric: 'Pain Reduction', value: '65%', description: 'Average pain level reduction in 6 months' },
  { metric: 'Treatment Efficiency', value: '40%', description: 'Faster diagnosis and treatment planning' },
  { metric: 'Patient Satisfaction', value: '94%', description: 'Patients report improved quality of life' },
  { metric: 'Cost Savings', value: '30%', description: 'Reduction in unnecessary hospital visits' }
];

export function EnhancedHomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Healthcare</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="gradient-text">Revolutionizing</span>
              <br />
              <span className="text-foreground">Cancer Pain Care</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Advanced AI-powered platform for cancer patient pain assessment, 
              monitoring, and management. Empowering patients and healthcare providers 
              with real-time insights.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-3 text-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg group glass"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools designed to improve cancer pain management and patient outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass hover:shadow-2xl transition-all duration-300 group border-0">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Trusted by Healthcare Heroes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what healthcare professionals and patients are saying about PainSense
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass hover:shadow-2xl transition-all duration-300 border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-4">
                        <span className="text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        data-scroll-section
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5"
            animate={{
              background: [
                "linear-gradient(45deg, hsl(var(--primary))/5%, hsl(var(--accent))/5%)",
                "linear-gradient(225deg, hsl(var(--accent))/5%, hsl(var(--primary))/5%)",
                "linear-gradient(45deg, hsl(var(--primary))/5%, hsl(var(--accent))/5%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            data-scroll
            data-scroll-speed="0.3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform <span className="gradient-text">Pain Care?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of healthcare providers and patients who are already 
              experiencing better outcomes with PainSense.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-3 text-lg group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg glass"
              >
                Schedule Demo
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                HIPAA compliant
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research & Data Section */}
      <section 
        className="py-20 bg-muted/20"
        data-scroll-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            data-scroll
            data-scroll-speed="0.3"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Evidence-Based Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform is backed by clinical research and real-world data demonstrating significant improvements in patient outcomes
            </p>
          </motion.div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            data-scroll
            data-scroll-speed="0.2"
          >
            {researchData.map((data, index) => (
              <motion.div
                key={data.metric}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center glass hover:shadow-2xl transition-all duration-300 border-0 h-full">
                  <CardContent className="p-8">
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                      {data.value}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">
                      {data.metric}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section 
        className="py-20"
        data-scroll-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            data-scroll
            data-scroll-speed="0.3"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Milestone <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Celebrating our journey of transforming cancer pain management globally
            </p>
          </motion.div>

          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            data-scroll
            data-scroll-speed="0.2"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section 
        className="py-20 bg-muted/30"
        data-scroll-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              data-scroll
              data-scroll-speed="0.3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Cutting-Edge Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Powered by advanced machine learning algorithms and real-time analytics, 
                PainSense delivers unparalleled accuracy in pain assessment and management.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI-Powered Predictions</h3>
                    <p className="text-muted-foreground">Machine learning models trained on millions of data points predict pain episodes before they occur.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground">Continuous health data collection and analysis for immediate intervention when needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-muted-foreground">Bank-level encryption and HIPAA compliance ensure your data is always protected.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              data-scroll
              data-scroll-speed="0.2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                <Card className="relative glass border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI Accuracy</span>
                        <span className="text-2xl font-bold gradient-text">98.7%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: '98.7%' }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="text-center p-4 rounded-xl bg-primary/10">
                          <div className="text-2xl font-bold text-primary">15ms</div>
                          <div className="text-xs text-muted-foreground">Response Time</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-accent/10">
                          <div className="text-2xl font-bold text-accent">24/7</div>
                          <div className="text-xs text-muted-foreground">Monitoring</div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>System Status: Operational</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
