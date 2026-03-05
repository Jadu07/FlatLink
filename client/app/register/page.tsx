import Image from "next/image"
import Link from "next/link"

export default function Register() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0">
        <Image
          src="/images/city_map_pattern.png"
          alt="Map Pattern Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        <div className="animate-in fade-in slide-in-from-bottom-12 overflow-hidden rounded-[4rem] border border-white bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] duration-1000">
          <div className="flex min-h-[600px] flex-col lg:flex-row">

            <div className="flex flex-1 flex-col justify-center space-y-8 p-12 lg:p-24">
              <div className="space-y-4">
                <p className="text-xl font-medium text-zinc-400 lg:text-2xl">
                  Join us! Create an account to get started.
                </p>
              </div>

              <div className="w-full max-w-md space-y-6">
                <form className="space-y-5">
                  <div className="space-y-6 pb-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="h-12 w-full border-b border-zinc-200 bg-transparent px-1 text-lg outline-none placeholder:text-zinc-400 transition-colors focus:border-[#164E44]"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      className="h-12 w-full border-b border-zinc-200 bg-transparent px-1 text-lg outline-none placeholder:text-zinc-400 transition-colors focus:border-[#164E44]"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="h-12 w-full border-b border-zinc-200 bg-transparent px-1 text-lg outline-none placeholder:text-zinc-400 transition-colors focus:border-[#164E44]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-full bg-[#164E44] h-14 text-[1.05rem] font-semibold text-white transition-all duration-300 hover:bg-[#123F37] hover:shadow-[0_8px_30px_rgb(22,78,68,0.2)] hover:-translate-y-0.5 mt-8"
                  >
                    Sign up
                  </button>
                </form>

                <p className="text-sm font-medium text-zinc-500 px-1">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold cursor-pointer text-[#164E44] hover:text-[#1E6356] transition-colors">
                    Log in
                  </Link>
                </p>
              </div>
            </div>

            <div className="pointer-events-none flex flex-1 items-center justify-center">
              <div className="relative h-[500px] w-full -translate-x-12 lg:h-[600px] lg:-translate-x-20">
                <Image
                  src="/images/logsign.svg"
                  alt="Signup illustration"
                  fill
                  className="object-contain pr-5 lg:pl-12 scale-110 lg:scale-[1.2]"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}