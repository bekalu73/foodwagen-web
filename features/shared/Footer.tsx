import { Mail } from "lucide-react";
import Link from "next/link";

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
              href="#"
              aria-label="Instagram"
              className="hover:text-[#FF9A0E]"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-[#FF9A0E]"
            >
              <i className="fab fa-facebook"></i>
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-[#FF9A0E]"
            >
              <i className="fab fa-twitter"></i>
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
            <button className="bg-gradient-to-r from-[#FFBA26] to-[#FF9A0E] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-6 text-xs text-gray-400 space-y-3 md:space-y-0">
        <p>
          All rights reserved ©{" "}
          <span className="text-white font-medium">Your Company</span>, 2021
        </p>
        <p>
          Made with 💛 by{" "}
          <span className="text-[#FF9A0E] font-medium">Themewagon</span>
        </p>
      </div>
    </footer>
  );
}
