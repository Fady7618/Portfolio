import { useEffect, useRef } from 'react';
import { Code, Palette, Rocket, Coffee, Heart, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, contentRef.current], { opacity: 0, y: 50 });
      gsap.set('.about-card', { opacity: 0, y: 50, rotationY: 15 });

      // ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
          // scrub: true,
        },
      });

      // Title reveal with split text effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Content reveal
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');

      // Cards reveal with 3D effect
      tl.to('.about-card', {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code that follows industry best practices and modern standards.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces that provide exceptional user experiences across all devices.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for lightning-fast load times, smooth animations, and seamless user interactions.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: 'Problem Solving',
      description: 'Tackling complex challenges with creative solutions and a methodical approach to debugging and optimization.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'User-Centered',
      description: 'Putting users first in every design decision, ensuring accessibility and inclusive design principles.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Staying ahead of the curve with cutting-edge technologies and experimental approaches to web development.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            About Me
          </h2>
          <div ref={contentRef} className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I'm a passionate frontend developer with over 5 years of experience creating
              digital experiences that combine beautiful design with robust functionality.
              I specialize in React, TypeScript, and modern web technologies.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing
              to open source projects, mentoring junior developers, or sharing knowledge
              with the developer community through blogs and talks.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="about-card group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;