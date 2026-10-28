import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { db } from '../services/db';
import { Menu, X, Compass, User, LogOut, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = db.getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Careers', path: '/careers' },
    { label: 'Career Assessment', path: '/assessment' },
    { label: 'FuturePath Roadmap', path: '/roadmap' },
    { label: 'Training', path: '/training' },
    { label: 'About Us', path: '/about' },
  ];

  const handleLogout = () => {
    db.logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#EDE5E8] shadow-subtle py-3'
          : 'bg-[#FFFCF7] border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="focus:outline-none" aria-label="You Aspirant Homepage">
          <BrandLogo variant="plum" size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#542744] bg-[#F5EDF3] font-semibold'
                    : 'text-[#77717A] hover:text-[#542744] hover:bg-[#F5EDF3]/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-button text-[#542744] bg-[#F5EDF3] border border-[#DBCBD6] hover:bg-[#EDE5E8] transition-all"
              >
                {currentUser.role === 'admin' ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-[#542744]" />
                    <span>Admin Portal</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-[#542744]" />
                    <span>{currentUser.fullName.split(' ')[0]}</span>
                  </>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-[#77717A] hover:text-[#C54A4A] rounded-xl hover:bg-[#F5EDF3] transition-all"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/student/login"
              className="px-3.5 py-2 text-sm font-medium text-[#542744] hover:text-[#754565] transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Primary CTA: Discover My Career */}
          <Link
            to="/assessment"
            className="flex items-center gap-2 px-4 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-sm font-medium shadow-sm transition-all hover:shadow-plum-glow group"
          >
            <Compass className="w-4 h-4 text-[#F4A340] group-hover:rotate-45 transition-transform duration-300" />
            <span>Discover My Career</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/assessment"
            className="px-3 py-1.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-medium flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Discover</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#542744] hover:bg-[#F5EDF3] focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FFFCF7] border-b border-[#EDE5E8] shadow-elevated px-5 py-6 animate-fade-in z-50">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'text-[#542744] bg-[#F5EDF3] font-semibold'
                      : 'text-[#29232C] hover:bg-[#F5EDF3]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-[#EDE5E8] flex flex-col gap-3">
              {currentUser ? (
                <>
                  <Link
                    to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                    className="w-full py-3 px-4 rounded-button text-center font-semibold bg-[#F5EDF3] text-[#542744] border border-[#DBCBD6]"
                  >
                    {currentUser.role === 'admin' ? 'Open Admin Dashboard' : 'Open Student Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 px-4 rounded-button text-center font-medium text-[#C54A4A] hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/student/login"
                    className="py-2.5 px-3 rounded-button text-center text-sm font-semibold border border-[#DBCBD6] text-[#542744]"
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/admin/login"
                    className="py-2.5 px-3 rounded-button text-center text-sm font-semibold bg-[#F5EDF3] text-[#754565]"
                  >
                    Admin Login
                  </Link>
                </div>
              )}

              <Link
                to="/assessment"
                className="w-full py-3 px-4 rounded-button bg-[#542744] text-[#FFFCF7] font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4 text-[#F4A340]" />
                <span>Start Career DNA Assessment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
