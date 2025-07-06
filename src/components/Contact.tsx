import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import meImg from '../assets/images/me.png';

gsap.registerPlugin(ScrollTrigger);

// Add these values from your EmailJS account
const SERVICE_ID = "service_not7eme";
const TEMPLATE_ID = "template_onauywk"; 
const PUBLIC_KEY = "39pJ4gQDlaOUsuL69";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, formRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Animate contact info and form
      tl.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Update the mouse movement effect
  useEffect(() => {
    // References to all animated elements with proper typing
    const elements: {
      image: HTMLImageElement | null;
      background: HTMLElement | null;
      particles: HTMLElement[];
      border: HTMLElement | null;
      codeElements: HTMLElement[];
    } = {
      image: imageRef.current,
      background: null,
      particles: [],
      border: null,
      codeElements: []
    };
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Find all the elements in the DOM
    const container = document.querySelector('.interactive-image-container');
    if (container) {
      elements.background = container.querySelector('.bg-gradient');
      elements.particles = Array.from(container.querySelectorAll('.floating-particle'));
      elements.border = container.querySelector('.moving-border');
      elements.codeElements = Array.from(container.querySelectorAll('.code-element'));
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to window center
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10 range
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10 range
    };
    
    // Animation loop for smoother movement
    const animateElements = () => {
      // Smooth follow effect
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      
      // Apply movement to image
      if (elements.image) {
        gsap.to(elements.image, {
          x: currentX * 0.5,
          y: currentY * 0.5,
          rotateY: currentX * 0.05,
          rotateX: -currentY * 0.05,
          duration: 0.8,
          ease: "power2.out"
        });
      }
      
      // Animate background
      if (elements.background) {
        gsap.to(elements.background, {
          x: currentX * -2.5,
          y: currentY * -2.5,
          duration: 1.2,
          ease: "power2.out"
        });
      }
      
      // Animate particles with different intensities
      elements.particles.forEach((particle, i) => {
        const factor = (i % 3 + 1) * 1.5;
        const direction = i % 2 === 0 ? 1 : -1;
        
        gsap.to(particle, {
          x: currentX * factor * direction,
          y: currentY * factor * 0.8,
          rotation: currentX * direction * 0.5,
          duration: 1 + i * 0.2,
          ease: "power1.out"
        });
      });
      
      // Animate border
      if (elements.border) {
        gsap.to(elements.border, {
          x: currentX * -0.8,
          y: currentY * -0.8,
          duration: 1,
          ease: "power2.out"
        });
      }
      
      // Animate code elements
      elements.codeElements.forEach((element, i) => {
        const factor = (i + 1) * 1.2;
        const direction = i % 2 === 0 ? 1 : -1;
        
        gsap.to(element, {
          x: currentX * factor * direction,
          y: currentY * factor * 0.5,
          rotation: currentX * direction * 0.2,
          duration: 0.8 + i * 0.3,
          ease: "power1.out"
        });
      });
      
      requestAnimationFrame(animateElements);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animateElements);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,           // {{name}} in template
          email: formData.email,         // {{email}} in template
          title: formData.subject,       // {{title}} in template 
          message: formData.message,     // {{message}} in template
        },
        PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Message Sent!',
        text: 'Thanks for reaching out. I\'ll get back to you soon!',
        icon: 'success',
        confirmButtonText: 'Great!',
        background: '#1f2937',
        color: '#fff',
        iconColor: '#60a5fa',
        confirmButtonColor: '#4f46e5',
        customClass: {
          popup: 'rounded-xl border border-gray-700',
        }
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Show error message with SweetAlert2
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#1f2937',
        color: '#fff',
        iconColor: '#ef4444',
        confirmButtonColor: '#4f46e5',
        customClass: {
          popup: 'rounded-xl border border-gray-700',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the contactInfo array to include social media links
  const contactInfo = [
    {
      icon: <Mail className="text-blue-400 w-5 h-5" />,
      title: 'Email',
      details: 'factaguib@gmail.com',
      link: 'mailto:factaguib@gmail.com',
    },
    {
      icon: <Phone className="text-blue-400 w-5 h-5" />,
      title: 'Phone',
      details: '+20 1095351591',
      link: 'tel:+201095351591',
    },
    {
      icon: <MapPin className="text-blue-400 w-5 h-5" />,
      title: 'Location',
      details: 'Cairo, EGY',
      link: '#',
    },
    {
      icon: <Github className="text-blue-400 w-5 h-5" />,
      title: 'GitHub',
      details: 'GitHub',
      link: 'https://github.com/Fady7618',
      external: true,
    },
    {
      icon: <Linkedin className="text-blue-400 w-5 h-5" />,
      title: 'LinkedIn',
      details: 'LinkedIn',
      link: 'https://linkedin.com/in/fady-alfred',
      external: true,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-900 relative">
      {/* Vertical lines in sidebars */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 via-transparent to-purple-400 opacity-20"></div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-transparent to-blue-400 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl sm:max-w-3xl mx-auto px-4">
            Ready to start your next project? Let's discuss how we can work together
            to bring your ideas to life.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Interactive Image */}
          <div className="flex items-center justify-center relative overflow-hidden">
            <div className="interactive-image-container relative w-full max-w-xs sm:max-w-sm mx-auto perspective-1000">
              {/* Animated background elements */}
              <div className="bg-gradient absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl transform transition-transform duration-1000 ease-out"></div>
              
              {/* Floating particles */}
              <div className="floating-particle absolute w-10 h-10 rounded-full bg-blue-400/30 blur-md top-10 left-10"></div>
              <div className="floating-particle absolute w-16 h-16 rounded-full bg-purple-400/20 blur-md bottom-20 right-20"></div>
              <div className="floating-particle absolute w-12 h-12 rounded-full bg-teal-400/20 blur-md top-32 right-10"></div>
              <div className="floating-particle absolute w-8 h-8 rounded-full bg-pink-400/20 blur-md top-40 left-32"></div>
              
              {/* Border that also moves */}
              <div className="moving-border absolute inset-0 border-2 border-gray-700/30 rounded-2xl"></div>
              
              {/* Image container with shadow */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-xl transform transition-all duration-700 z-10">
                <img
                  ref={imageRef}
                  src={meImg} 
                  alt="Profile"
                  className="w-full max-h-[350px] object-cover object-center"
                />
              </div>
              
              {/* Floating code-like elements */}
              <div className="code-element absolute -bottom-2 -right-2 w-24 h-5 bg-blue-500/20 rounded-md blur-sm"></div>
              <div className="code-element absolute -top-2 -left-10 w-20 h-3 bg-purple-500/20 rounded-md blur-sm"></div>
              <div className="code-element absolute top-1/2 -right-4 w-10 h-2 bg-teal-500/20 rounded-md blur-sm"></div>
              <div className="code-element absolute bottom-1/4 -left-6 w-14 h-3 bg-indigo-500/20 rounded-md blur-sm"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col w-full">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Project Discussion"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 relative flex items-center">
          <div className="flex-grow border-t border-gray-700/50"></div>
          <div className="px-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-grow border-t border-gray-700/50"></div>
        </div>

        {/* Connect With Me Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Connect With Me
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.link} 
                className="flex items-center space-x-3 px-5 py-4 bg-gray-800/80 rounded-xl transition-all duration-300 hover:bg-gray-700 hover:scale-105 border border-gray-700/50 hover:border-blue-500/50 min-w-[180px]"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="p-2 bg-gray-900/50 rounded-lg">
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">{item.title}</p>
                  <span className="text-gray-200 font-medium">{item.details}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;