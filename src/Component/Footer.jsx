import { Link } from "react-router";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-16 border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600">TechStore</h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your trusted destination for quality electronics and accessories.
              Shop with confidence and enjoy a seamless online shopping
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/addcard"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Customer Support</h3>

            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-gray-400">
                Help Center
              </li>

              <li className="text-gray-600 dark:text-gray-400">
                Returns & Refunds
              </li>

              <li className="text-gray-600 dark:text-gray-400">
                Shipping Information
              </li>

              <li className="text-gray-600 dark:text-gray-400">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>

            <div className="flex gap-4 text-2xl">
              <a
                href="https://github.com/SudhangsuShekharBairagi"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-600"
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
                className="transition hover:text-red-500"
              >
                <FaEnvelope />
              </a>
            </div>

            <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
              Email: ssbairagi.dev.com
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} TechStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;