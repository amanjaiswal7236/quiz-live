import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Quiz.com Logo" width={80} height={60} className="mr-8" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-pink-200 rounded-lg p-2 flex items-center">
            <span className="text-gray-700 mr-2">Join Game? Enter PIN:</span>
            <Input 
              type="text" 
              placeholder="123 456" 
              className="w-24 text-center"
            />
          </div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => router.push('/sign-in')}
            >
              Sign in
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
