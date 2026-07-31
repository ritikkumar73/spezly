import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import Logo from './logo';
import { ThemeToggle } from './theme-toggle';

const Header = async () => {

  await checkUser(); // Ensuring user authentication check before rendering

  return (
    <div className='fixed top-0 w-full z-50 border-b border-border/40 shadow-sm bg-background dark:bg-background transition-colors duration-300'> 
      {/* Sticky header with solid background */}

      <nav className='container mx-auto px-4 py-4 flex items-center justify-between'> 
        {/* Navigation bar with padding and spacing */}

        <Logo className="h-12" />

        {/* Navigation links and user authentication buttons */}
        <div className='flex items-center space-x-4'>

          <ThemeToggle />

          <SignedIn> 
            {/* Displayed only when the user is signed in */}

            <Link 
              href="/transaction/create"
              className='text-muted-foreground hover:text-primary transition-colors duration-300'
            >
              <Button className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground'>
                <PenBox size={18}/> 
                <span className='hidden md:inline'>Add Transaction</span>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline" className='hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300'>
                <LayoutDashboard size={18}/> 
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </Link>

          </SignedIn>

          <SignedOut> 
            {/* Displayed only when the user is signed out */}
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className='hover:bg-primary hover:text-primary-foreground transition-colors duration-300'>
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn> 
            {/* User profile button when signed in */}
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10 hover-scale",
                userButtonPopoverCard: "bg-background border-border/40",
                userButtonPopoverActionButton: "hover:bg-secondary",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverActionButtonIcon: "text-primary",
              },
            }}/>
          </SignedIn>

        </div>

      </nav>

    </div>

  );
}

export default Header;

