import { useState } from 'react';
import { Github, Linkedin, Copy, Check } from 'lucide-react';

const StickyElements = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Fady7618', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/fady-alfred', label: 'LinkedIn' }
  ];

  const handleEmailClick = async () => {
    const email = 'hello@example.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      {/* Left Sidebar - Social Links */}
      <div className="fixed left-2.5 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-6">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
        
        {socialLinks.map(({ icon: Icon, href, label }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:bg-gray-800/50 rounded-full backdrop-blur-sm"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
        
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
      </div>

      {/* Right Sidebar - Email */}
      <div className="fixed right-2.5 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-6">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60"></div>
        
        <button
          onClick={handleEmailClick}
          className="group flex items-center space-x-2 p-3 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:bg-gray-800/50 rounded-full backdrop-blur-sm"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-sm font-mono tracking-wider">factaguib@gmail.com</span>
          {emailCopied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
        
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60"></div>
      </div>
    </>
  );
};

export default StickyElements;