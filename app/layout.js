import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header.jsx";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spenzly - Smart Finance Management",
  description: "Take control of your finances with AI-powered insights and real-time analytics.",
};

export default function RootLayout({ children }) {
  const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClerkProvider publishableKey={clerkPk}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Header />
              <main className="pt-16">{children}</main>
              <Toaster richColors />
              
              {/* Footer */}
              <footer className="glass-effect border-t border-border/40 mt-20">
                <div className="container mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                      <Link href="/" className="hover-scale">
                        <h2 className="text-2xl font-bold gradient-title">Spenzly</h2>
                      </Link>
                      <p className="text-muted-foreground max-w-md">
                        An AI-powered financial management tool that helps you track, analyze, and optimize your spending with real-time insights.
                      </p>
                      <div className="flex space-x-4">
                        <a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <Github size={20} />
                        </a>
                        <a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <Twitter size={20} />
                        </a>
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <Linkedin size={20} />
                        </a>
                        <a 
                          href="mailto:support@spenzly.com" 
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <Mail size={20} />
                        </a>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link 
                            href="/dashboard" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/transaction/create" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Add Transaction
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/analytics" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Analytics
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/settings" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Settings
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Legal & Support */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Legal & Support</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link 
                            href="/privacy" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/terms" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Terms of Service
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/contact" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            Contact Support
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="/faq" 
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          >
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Spenzly. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                      <Link 
                        href="/security" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        Security
                      </Link>
                      <Link 
                        href="/status" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        Status
                      </Link>
                      <Link 
                        href="/blog" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        Blog
                      </Link>
                    </div>
                  </div>
          </div>
        </footer>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
