'use client'

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
const handleSignIn = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error) {
      console.error(error);
      console.log("Sign-in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in.",
      });
    }
  };

  return <Button onClick={() => handleSignIn("google")}>google login</Button>
}

export default page