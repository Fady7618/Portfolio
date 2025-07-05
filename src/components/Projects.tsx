import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
      description: 'A full-featured e-commerce application built with Angular, TypeScript. Features include product catalog, shopping cart, user authentication, and secure checkout process, Responsive Bootstrap design',
      image: 'src/assets/images/E-commerce.jpg',
      technologies: ['Angular', 'TypeScript', 'bootstrap', 'Node.js','html','css'],
      github: 'https://github.com/Fady7618/E-CommerceAngular',
      live: 'https://e-commerce-seven-phi-59.vercel.app/',
      featured: true,
      stats: { stars: 234, forks: 45 },
    },
    {
      title: 'GenCare Health App',
      description: 'GenCare is a software solution with an integrated AI solution that enables early detection and diagnosis of various congenital disorders. Beyond diagnosis, our software offers a suite of features to guide and support the mothers in maintaining a healthy pregnancy.',
      image: 'src/assets/images/GenCare.jpg',
      technologies: ['EJS', 'Node.js', 'MongoDB', 'Express' , 'Bootstrap', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Fady7618/GenCare-Project',
      live: 'https://gencare-five.vercel.app',
      featured: true,
      stats: { stars: 189, forks: 32 },
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts, interactive charts, beautiful animations, and detailed weather analytics powered by modern APIs.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Chart.js', 'Weather API', 'CSS3', 'PWA'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      stats: { stars: 156, forks: 28 },
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media analytics dashboard with real-time data visualization, user engagement metrics, content scheduling, and performance insights.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'Firebase', 'Material-UI', 'Analytics'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      stats: { stars: 298, forks: 67 },
    },
    {
      title: 'Learning Management System',
      description: 'An educational platform with course management, progress tracking, interactive quizzes, video streaming capabilities, and comprehensive student analytics.',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Video.js'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
      stats: { stars: 412, forks: 89 },
    },
    {
      title: 'AI-Powered Chat App',
      description: 'An intelligent chat application with AI-powered responses, real-time messaging, file sharing, voice messages, and advanced conversation analytics.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'OpenAI API', 'WebSocket', 'Redis', 'Docker'],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
      stats: { stars: 567, forks: 123 },
    },
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
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
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
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-600/20 text-gray-400 rounded-md">
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