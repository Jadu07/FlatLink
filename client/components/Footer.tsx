import Link from "next/link"

export default function Footer() {
  const product = [
    { label: "Explore Listings", href: "/explore-listings" },
    { label: "Post a Listing", href: "/post-listing" },
    { label: "Find Flatmates", href: "/flatmates" },
    { label: "Verified Properties", href: "/verified-properties" },
  ]

  const company = [
    { label: "About FlatLink", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Our Story", href: "/our-story" },
    { label: "Contact Us", href: "/contact" },
  ]

  const support = [
    { label: "Safety Guidelines", href: "/safety" },
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]

  const socials = [
    { slug: "x", href: "https://x.com/jadu_07" },
    { slug: "instagram", href: "https://instagram.com/_jadu_._" },
    { slug: "github", href: "https://github.com/jadu07" },
  ]

  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="text-2xl font-semibold">
              <span className="text-[#164E44] font-black">flat</span>
              <span className="text-zinc-900 font-light">link</span>
            </Link>

            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Making house hunting and flatmate matching simpler, faster, and more reliable for everyone by bringing the right people and the right homes together effortlessly.
            </p>

            <div className="flex gap-4 pt-2">
              {socials.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 hover:bg-zinc-100"
                >
                  <span
                    className="w-4 h-4 bg-zinc-500"
                    style={{
                      maskImage: `url(https://cdn.simpleicons.org/${s.slug})`,
                      WebkitMaskImage: `url(https://cdn.simpleicons.org/${s.slug})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-3 gap-10">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest">
                Product
              </h3>
              <ul className="space-y-3 text-sm text-zinc-500 leading-relaxed">
                {product.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="hover:text-zinc-900">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest">
                Company
              </h3>
              <ul className="space-y-3 text-sm text-zinc-500 leading-relaxed">
                {company.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="hover:text-zinc-900">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest">
                Support
              </h3>
              <ul className="space-y-3 text-sm text-zinc-500 leading-relaxed">
                {support.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="hover:text-zinc-900">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-100 flex flex-col md:flex-row justify-between text-sm text-zinc-400 gap-3">
          <p>© {new Date().getFullYear()} FlatLink. All rights reserved.</p>
          <p>Crafted for better renting experience</p>
        </div>
      </div>
    </footer>
  )
}