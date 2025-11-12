import { Mail } from "lucide-react";
import Link from "next/link";

// Social Media Icons
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-gray-300 py-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Help & Support
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Partner with us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Ride with us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Refund & Cancellation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#FF9A0E]">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us + Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-4">FOLLOW US</h3>
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#FF9A0E] transition-colors"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#FF9A0E] transition-colors"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#FF9A0E] transition-colors"
            >
              <TwitterIcon />
            </Link>
          </div>

          <p className="text-sm mb-3">
            Receive exclusive offers in your mailbox
          </p>

          <div className="flex items-center bg-[#2B2B2B] rounded-md overflow-hidden">
            <div className="flex items-center pl-3">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Enter Your email"
              className="bg-transparent text-sm text-gray-300 px-3 py-2 w-full focus:outline-none"
            />
            <button className="bg-gradient-to-r from-[#FFBA26] to-[#FF9A0E] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-6 text-xs text-gray-400 space-y-3 md:space-y-0">
        <p>
          All rights reserved ©{" "}
          <span className="text-white font-medium">FoodWagen</span>, 2024
        </p>
        <p>
          Made with 💛 by{" "}
          <span className="text-[#FF9A0E] font-medium">Bekalu Sisay</span>
        </p>
      </div>
    </footer>
  );
}
