import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link href="/">
        <Image
          src="/images/404.svg"
          alt="404"
          width={800}
          height={500}
        />
      </Link>
    </main>
  );
}