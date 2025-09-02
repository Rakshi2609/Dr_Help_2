'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  Heart,
  Sun,
  Moon,
  Shield,
  Activity,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Doctors', href: '/doctors', icon: User },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Health Monitor', href: '/monitor', icon: Heart },
  { name: 'Emergency', href: '/emergency', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">PainSense</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="group relative overflow-hidden hover:bg-primary/10 transition-all duration-300"
                    >
                      <item.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      {item.name}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        layoutId="nav-hover"
                      />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="relative overflow-hidden group"
                >
                  <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Quick Action Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 hidden sm:flex">
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Start
                </Button>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 md:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold gradient-text">PainSense</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start group hover:bg-primary/10 transition-all duration-300"
                        >
                          <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                          {item.name}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => setIsOpen(false)}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Start
                  </Button>
                  
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="w-full"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-4 h-4 mr-2" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 mr-2" />
                          Dark Mode
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
