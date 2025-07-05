import { useEffect, useRef } from 'react';
import { ArrowDown, Mouse } from 'lucide-react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import CharacterModel from './CharacterModel';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([nameRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
      });

      // Create master timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Name typing animation
      if (nameRef.current) {
        const nameText = "Fady Alfred";
        nameRef.current.innerHTML = '';
        
        tl.to(nameRef.current, {
          opacity: 1,
          duration: 0.1,
        })
        .to(nameRef.current, {
          duration: nameText.length * 0.1,
          ease: 'none',
          text: {
            value: nameText + '|',
            delimiter: '',
          },
          onUpdate: function() {
            const progress = this.progress();
            if (progress < 1) {
              nameRef.current!.innerHTML = nameText.substring(0, Math.floor(progress * nameText.length)) + '<span class="animate-pulse">|</span>';
            } else {
              nameRef.current!.innerHTML = nameText;
            }
          }
        });
      }

      // Title typing animation
      if (titleRef.current) {
        const titleText = "Frontend Developer";
        titleRef.current.innerHTML = '';
        
        tl.to(titleRef.current, {
          opacity: 1,
          duration: 0.1,
        }, '-=0.5')
        .to(titleRef.current, {
          duration: titleText.length * 0.08,
          ease: 'none',
          text: {
            value: titleText + '|',
            delimiter: '',
          },
          onUpdate: function() {
            const progress = this.progress();
            if (progress < 1) {
              titleRef.current!.innerHTML = titleText.substring(0, Math.floor(progress * titleText.length)) + '<span class="animate-pulse text-blue-400">|</span>';
            } else {
              titleRef.current!.innerHTML = titleText;
            }
          }
        });
      }

      // Subtitle animation
      if (subtitleRef.current) {
        const subtitleText = "Crafting beautiful, responsive, and performant web experiences with modern technologies and creative flair.";
        
        tl.to(subtitleRef.current, {
          opacity: 1,
          duration: 0.1,
        }, '-=0.3')
        .to(subtitleRef.current, {
          duration: subtitleText.length * 0.015,
          ease: 'none',
          text: {
            value: subtitleText,
            delimiter: '',
          }
        });
      }

      // CTA buttons animation
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5');

      // Floating animation for arrow
      gsap.to('.scroll-arrow', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 4,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      gsap.to(window, {
        duration: 0,
        scrollTo: { y: aboutSection, offsetY: 80 },
        ease: 'power2.inOut',
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      gsap.to(window, {
        duration: 0.2,
        scrollTo: { y: projectsSection, offsetY: 80 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-left relative left-2 ms-0">
            <div className="mb-4">
              <p className="text-blue-400 font-mono text-lg mb-2">Hi, my name is</p>
              <h1
                ref={nameRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-100 min-h-[1.2em] font-mono"
              >
              </h1>
              <h2
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent min-h-[1.2em]"
              >
              </h2>
            </div>
            
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed min-h-[4em]"
            >
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 items-start mb-16 opacity-0">
              <button 
                onClick={scrollToProjects}
                className="group px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center space-x-2">
                  <span>Check out my work!</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={scrollToAbout}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Learn More About Me
              </button>
            </div>
          </div>

          {/* 3D Character - Replace the existing Character3D with the new model */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
              <CharacterModel />
            </div>
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="scroll-arrow text-gray-400 hover:text-white transition-colors duration-300 absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <Mouse size={28} />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;