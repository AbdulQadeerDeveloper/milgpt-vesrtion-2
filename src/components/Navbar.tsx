"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<number | null>(
    null
  );

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Tools",
      submenu: [
        { title: "AI Tools", href: "/tools/ai" },
        { title: "Productivity Tools", href: "/tools/productivity" },
        { title: "Marketing Tools", href: "/tools/marketing" },
        { title: "Developer Tools", href: "/tools/developer" },
      ],
    },
    { name: "Services", href: "/services" },
    { name: "Submit Project", href: "/submit-project" },
    { name: "Contact us", href: "/contact" },
  ];

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* 🖥️ Desktop Navbar */}
      <nav className="hidden lg:flex w-full h-[90px] sticky top-0 bg-background/90 backdrop-blur-md border-b border-white/10 z-30">
        <div className="container mx-auto flex justify-between items-center h-full px-6 text-white">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            MilGPT
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-8 font-medium text-base">
            {links.map((link, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setDropdownOpen(index)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {/* Conditionally render Link or button */}
                {link.href ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 hover:text-[#4A6B48] transition-all duration-300"
                  >
                    {link.name}
                    {link.submenu && (
                      <MdOutlineKeyboardArrowDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          dropdownOpen === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-[#4A6B48] transition-all duration-300"
                  >
                    {link.name}
                    {link.submenu && (
                      <MdOutlineKeyboardArrowDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          dropdownOpen === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}

                {/* Dropdown Menu */}
                {link.submenu && dropdownOpen === index && (
                  <div className="absolute top-full left-0 w-56 bg-[#1A1A1A] border border-white/10 rounded-md p-3 mt-2 shadow-xl z-50 animate-fadeIn">
                    <ul className="flex flex-col gap-1">
                      {link.submenu.map((item, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 rounded-md hover:bg-[#4A6B48]/30 hover:text-[#C3E6C0] transition-all"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-5">
            <Link href="/auth/login">
              <p className="font-semibold hover:text-[#4A6B48] transition-colors">
                Sign In
              </p>
            </Link>
            <Link href="/auth/register">
              <p className="font-semibold px-5 py-2 rounded bg-[#4A6B48] hover:bg-[#3b5639] transition-all">
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </nav>

      {/* 📱 Mobile Navbar */}
      <nav className="flex lg:hidden w-full h-[90px] sticky top-0 bg-background z-30 px-5 justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          MilGPT
        </Link>
        <GiHamburgerMenu
          onClick={() => setIsOpen(true)}
          className="w-7 h-7 text-white cursor-pointer"
        />
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[320px] bg-background text-white z-40 transform transition-transform duration-300 shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/20">
          <Link href="/" className="text-xl font-bold">
            MilGPT
          </Link>
          <IoClose
            className="w-7 h-7 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col gap-4 p-6 font-medium text-base">
          {links.map((link, index) => (
            <li key={index}>
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() =>
                  setMobileDropdownOpen(
                    mobileDropdownOpen === index ? null : index
                  )
                }
              >
                {/* Link or button fallback */}
                {link.href ? (
                  <Link
                    href={link.href}
                    className="py-2 block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button type="button" className="py-2 block w-full text-left">
                    {link.name}
                  </button>
                )}

                {link.submenu && (
                  <MdOutlineKeyboardArrowDown
                    className={`w-6 h-6 transition-transform duration-300 ${
                      mobileDropdownOpen === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {link.submenu && mobileDropdownOpen === index && (
                <ul className="pl-4 mt-2 flex flex-col gap-2 animate-fadeIn">
                  {link.submenu.map((item, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={item.href}
                        className="block py-2 hover:text-[#4A6B48]"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-4 px-6 py-4 border-t border-white/20">
          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            <p className="font-semibold hover:text-[#4A6B48]">Sign In</p>
          </Link>
          <Link href="/auth/register" onClick={() => setIsOpen(false)}>
            <p className="font-semibold px-4 py-2 rounded bg-[#4A6B48] hover:bg-[#3b5639] text-center transition-all">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
