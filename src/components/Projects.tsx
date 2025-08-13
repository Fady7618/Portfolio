import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Star, GitFork, Globe } from 'lucide-react';
import { FaReact, FaAngular, FaNodeJs, FaHtml5, FaCss3 } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images
import ecommerceImg from '../assets/images/E-commerce.jpg';
import gencareImg from '../assets/images/GenCare.jpg';
import portfolioImg from '../assets/images/Portfolio.jpg';
import spotifyImg from '../assets/images/Spotify.jpg';
import scoopImg from '../assets/images/Scoop.png';
import photographyImg from '../assets/images/Photography.png';
import { features } from 'process';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // Tech icon mapping
  const getTechIcon = (tech: string) => {
    const normalizedTech = tech.toLowerCase();
    const iconMap: Record<string, JSX.Element> = {
      'react': <FaReact className="text-blue-400" />,
      'angular': <FaAngular className="text-red-500" />,
      'javascript': <SiJavascript className="text-yellow-400" />,
      'typescript': <SiTypescript className="text-blue-500" />,
      'node.js': <FaNodeJs className="text-green-500" />,
      'mongodb': <SiMongodb className="text-green-400" />,
      'express': <SiExpress className="text-gray-400" />,
      'html': <FaHtml5 className="text-orange-500" />,
      'css': <FaCss3 className="text-blue-500" />,
      'bootstrap': <SiBootstrap className="text-purple-500" />,
      'tailwind css': <SiTailwindcss className="text-cyan-400" />,
      'gsap': <SiJavascript className="text-green-300" />, // Using JS icon as placeholder for GSAP
      'ejs': <SiJavascript className="text-yellow-300" />, // Using JS icon as placeholder for EJS
      // Add more mappings as needed
    };
    
    // Default icon for technologies without specific mappings
    return iconMap[normalizedTech] || <Globe size={14} className="text-gray-400" />;
  };
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set('.project-card', { opacity: 0, y: 80, rotationX: 15 });

      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Project cards animation with 3D effect
      gsap.to('.project-card', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full stack e-commerce application built with Angular, TypeScript. Features include product catalog, shopping cart, user authentication, and secure checkout process, Responsive Bootstrap design',
      image: ecommerceImg,
      technologies: ['Angular', 'TypeScript', 'javascript','mongodb','express','bootstrap', 'Node.js','html','css','gsap'],
      github: 'https://github.com/Fady7618/E-CommerceAngular',
      live: 'https://e-commerce-seven-phi-59.vercel.app/',
      featured: true,
      stats: { stars: 234, forks: 45 },
    },
    {
      title: 'Photoghraphy Website',
      description:'A modern photography website showcasing stunning images with a clean, responsive design. Features smooth GSAP animations, a dynamic gallery, and a user-friendly interface built with React and Tailwind CSS.',
      image: photographyImg,
      technologies: ['React','TypeScript', 'Tailwind CSS', 'GSAP', 'JavaScript'],
      github:'https://github.com/Fady7618/Photographer',
      live: 'https://photographertmplt.vercel.app/',
      featured: true,
      stats: { stars: 98, forks: 12},
    },
    {
      title: 'GenCare Health App',
      description: 'GenCare is a software solution with an integrated AI solution that enables early detection and diagnosis of various congenital disorders. Beyond diagnosis, our software offers a suite of features to guide and support the mothers in maintaining a healthy pregnancy.',
      image: gencareImg,
      technologies: ['EJS', 'Node.js', 'MongoDB', 'Express' , 'Bootstrap', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Fady7618/GenCare-Project',
      live: 'https://gencare-five.vercel.app',
      featured: true,
      stats: { stars: 189, forks: 32 },
    },
    {
      title: 'Spotify App Clone',
      description: 'A Spotify-inspired music streaming web app clone. Features include authentication, playlists, search, and a responsive UI. Built with React, Tailwind CSS, and integrates with the Spotify API for real music data.',
      image: spotifyImg,
      technologies: ['React', 'Tailwind CSS', 'gsap', 'Spotify API', 'Typescript', 'Node.js'],
      github: 'https://github.com/Fady7618/Spotify-App', // Add your GitHub repo link if available
      live: 'https://spotifyapp-flax.vercel.app/',
      featured: true,
      stats: { stars: 0, forks: 0 },
    },
    {
      title: 'Scoop Ice Cream Shop',
      description: 'Scoop is a modern ice cream shop website featuring smooth GSAP-powered scroll animations, a vibrant product gallery, and a responsive design for a delightful user experience.',
      image: scoopImg,
      technologies: ['React', 'GSAP', 'SCSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/Fady7618/Scoop', // Add your GitHub repo link if available
      live: 'https://scoop-phi.vercel.app/',   // Add your live demo link if available
      featured: true,
      stats: { stars: 0, forks: 0 },
    },
    {
      title: 'Portfolio',
      description: 'A personal portfolio website showcasing my skills, projects, and experience. Built with React, Tailwind CSS, and GSAP for smooth animations.',
      image: portfolioImg,
      technologies: ['React', 'Tailwind CSS', 'GSAP', 'Typescript'],
      github: 'https://github.com/Fady7618/Portfolio',
      live: 'https://portfolio-five-zeta-79.vercel.app',
      featured: true,
      stats: { stars: 120, forks: 25 },
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills in frontend development,
            UI/UX design, and modern web technologies. Each project represents a unique challenge
            and demonstrates different aspects of my expertise.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-5 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={index}
              className="project-card group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.01] perspective-1000 max-w-md mx-auto w-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  {project.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex flex-col justify-betweeen">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* For featured projects - update the technology badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 text-xs font-medium bg-gradient-to-br from-gray-800 to-gray-700 border border-blue-500/20 text-gray-200 rounded-lg hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-400/40 transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group/link"
                    >
                      <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium hidden md:inline-block">Code</span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 group/link"
                    >
                      <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium hidden md:inline-block">Live Demo</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={14} />
                      <span>{project.stats.forks}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-7">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div
              key={index}
              className="project-card group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/30 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 max-w-md mx-auto w-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
                  {project.description}
                </p>
                
                {/* For non-featured projects - update the technology badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-gray-800/70 border border-gray-700 text-gray-300 rounded-md flex items-center gap-1 hover:bg-gray-700/70 hover:border-blue-500/30 transition-all duration-200"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-800/70 border border-gray-700 text-gray-400 rounded-md hover:bg-gray-700/70 transition-all duration-200">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-500 text-xs">
                    <div className="flex items-center space-x-1">
                      <Star size={12} />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={12} />
                      <span>{project.stats.forks}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;