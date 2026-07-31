"use client";

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight, BarChart3, CreditCard, PieChart } from 'lucide-react';

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-title leading-tight">
                Smart Finance Management for Modern Life
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Take control of your finances with AI-powered insights and real-time analytics. Make smarter decisions with Spenzly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/features">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/50">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-sm">Real-time Analytics</span>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/50">
                <PieChart className="h-5 w-5 text-primary" />
                <span className="text-sm">Smart Budgeting</span>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/50">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm">Multi-Account</span>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/50">
                <ArrowRight className="h-5 w-5 text-primary" />
                <span className="text-sm">AI Insights</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full flex items-center justify-center">
            <div className="hero-image-wrapper w-full max-w-md">
              <div ref={imageRef} className="hero-image animate-float">
                <div className="relative">
                  {/* Main Dashboard Image */}
                  <Image
                    src="/banner.png"
                    alt="Spenzly Dashboard Preview"
                    width={400}
                    height={300}
                    className="rounded-2xl shadow-2xl border border-border/40 mx-auto card-hover w-full h-auto"
                    priority
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse delay-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
