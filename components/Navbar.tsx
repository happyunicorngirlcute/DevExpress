import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header>
            <nav className="flex items-center justify-between">
                <Link
                    href="/"
                    className="logo flex items-center gap-2"
                >
                    <Image
                        src="/icons/logo.png"
                        alt="DevEvent logo"
                        width={24}
                        height={24}
                    />

                    <p>DevEvent</p>
                </Link>

                <ul className="flex items-center gap-6">
                    <p>
                        <Link href="/">
                            Home
                        </Link>
                    </p>

                    <p>
                        <Link href="/events">
                            Events
                        </Link>
                    </p>

                </ul>
            </nav>
        </header>
    );
};

export default Navbar;