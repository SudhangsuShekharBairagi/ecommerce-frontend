import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              TechStore
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Your trusted destination for quality electronics and accessories.
              Shop with confidence and enjoy a seamless online shopping
              experience.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 transition hover:text-indigo-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 transition hover:text-indigo-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/addcard"
                  className="text-slate-600 transition hover:text-indigo-600"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-slate-600 transition hover:text-indigo-600"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Customer Support
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Help Center</li>
              <li>Returns & Refunds</li>
              <li>Shipping Information</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Connect With Us
            </h3>
            <div className="flex gap-4 text-2xl text-slate-600">
              <a
                href="https://github.com/SudhangsuShekharBairagi"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-indigo-600"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-600"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-pink-500"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:ssbairagi.dev@gmail.com"
                className="transition hover:text-rose-500"
              >
                <FaEnvelope />
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Email: ssbairagi.dev@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TechStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
