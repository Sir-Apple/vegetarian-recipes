'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity duration-200"
        >
          <Image
            src="/images/logo.png"
            alt="Home"
            width={80}
            height={80}
            className="object-cover rounded-full"
            priority
          />
        </Link>
      </div>
    </nav>
  );
}
