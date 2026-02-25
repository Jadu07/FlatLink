import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <span className="text-3xl select-none">
            <span className="font-black text-[#164E44]">flat</span>
            <span className="font-light text-zinc-950">link</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-950"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#164E44] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1E6356]"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}