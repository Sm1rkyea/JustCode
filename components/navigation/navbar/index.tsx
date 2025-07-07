'use client';

import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const index = () => {
  const { data: session } = useSession();
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setOpaque(window.scrollY >= 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={clsx('fixed inset-x-0 top-0 z-50 flex justify-between items-center text-white/90 max-sm:px-10 max-md:px-30 px-50 p-6', 'transition-all duration-300', opaque ? 'bg-dark-500/[0.99]' : 'bg-transparent')}>
        <Link href='/' className='flex items-center gap-1'>
            <Image src='/images/logo.svg' alt='Logo' width={54} height={54} />
        </Link>

        <div className='flex flex-wrap gap-6 items-center'>
            <Link href='/courses' className='hover:text-white/60 transition-all duration-200'>Seznam kurzů</Link>
            <Link href='/our-team' className='hover:text-white/60 transition-all duration-200 max-sm:hidden'>Náš tým</Link>

            {session?.user?.name ? (
              <DropdownMenu>
                  <DropdownMenuTrigger className='cursor-pointer flex items-center gap-x-1'>
                    <Image src={session?.user?.image ?? '/images/user.svg'} alt='Profile' width={40} height={40} className='rounded-full' />
                    <Image src='/icons/arrow-up.png' alt='Arrow Up' width={24} height={24} className='rounded-full' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='min-w-[30vh] bg-dark-500 border-slate-900/50 mx-10 mt-2'>
                      <DropdownMenuLabel className='flex justify-between px-2 py-2'>
                          <h1>{session?.user?.name}</h1>
                          <Badge variant="default" className='bg-white/[0.05] text-slate-200'>Základní</Badge>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className='bg-slate-900/80' />
                      <Link href={ROUTES.OUR_TEAM} target='_blank' className='sm:hidden'>
                        <DropdownMenuItem className='py-3 !px-3 cursor-pointer rounded-[4px] transition-all duration-300'>Náš tým</DropdownMenuItem>
                      </Link>

                      <Link href={ROUTES.DASHBOARD} target='_blank'>
                        <DropdownMenuItem className='py-3 !px-3 cursor-pointer rounded-[4px] transition-all duration-300'>Dashboard</DropdownMenuItem>
                      </Link>
                      <Link href={ROUTES.PROFILE} target='_blank'>
                        <DropdownMenuItem className='py-3 !px-3 cursor-pointer rounded-[4px] transition-all duration-300'>Profil</DropdownMenuItem>
                      </Link>
                      <Link href='https://discord.justcode.cz' target='_blank'>
                        <DropdownMenuItem className='py-3 !px-3 cursor-pointer rounded-[4px] transition-all duration-300'>Discord</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator className='bg-slate-900/80' />
                      <DropdownMenuItem onClick={() => signOut()} className='py-3 !px-3 cursor-pointer rounded-[4px] hover:!bg-red-300/20 transition-all duration-300'>Odhlásit se</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className='cursor-pointer' onClick={() => redirect(ROUTES.SIGN_IN)}>Přihlásit se</Button>
            )}
        </div>
    </nav>
  )
}

export default index