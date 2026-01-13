import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });
      gsap.set('.experience-item', { opacity: 0, x: -50 });
      gsap.set('.experience-divider', { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          '.experience-item',
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          '.experience-divider',
          {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentJob = {
    title: 'Front End Engineer',
    company: 'Syscodeia',
    location: 'Remote',
    period: 'Oct 2025 - Present',
    type: 'Full Time',
    responsibilities: [
      'Built reusable Angular components and shared services following DRY and clean code principles',
      'Implemented modular architecture with TailwindCSS for scalable UI development',
      'Worked in an Agile team using Azure DevOps, GitHub PRs, and API integrations',
    ],
    current: true,
  };

  const experiences = [
    {
      title: 'Front End Developer',
      company: 'Ministry Of Communication and Information Technology - DEPI',
      location: 'Egypt',
      period: 'Apr - Oct 2024',
      type: 'Internship',
      responsibilities: [
        'Developed and maintained responsive commerce projects using Angular, TypeScript, and TailwindCSS',
        'Optimized UI performance by 60% through lazy loading and image optimization [E Commerce Store]',
      ],
    },
    {
      title: 'Intern',
      company: 'CIB Summer Internship',
      location: 'Egypt',
      period: 'May - Jun 2024',
      type: 'Internship',
      responsibilities: [
        'Completed structured training in financial literacy, entrepreneurship fundamentals, and business operations',
        'Developed strong human-centric communication skills through team-based activities and case discussions',
      ],
    },
    {
      title: 'Intern',
      company: 'Banque Misr EBSM',
      location: 'Egypt',
      period: 'Aug - Sep 2024',
      type: 'Internship',
      responsibilities: [
        'Participated in 3-weeks training on financial inclusion, banking operations, and branch systems',
        'Gained exposure to core banking workflows and customer-facing financial services',
      ],
    },
    {
      title: 'Front End Developer',
      company: 'Array Academy',
      location: 'Egypt',
      period: 'Mar - Sep 2022',
      type: 'Course',
      responsibilities: [
        'Learnt the fundamentals of HTML, CSS & Javascript',
        'Developed multiple simple interfaces using HTML & CSS & JS',
      ],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gray-900 relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-transparent to-blue-400 opacity-20"></div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 via-transparent to-purple-400 opacity-20"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Experience
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            My professional journey in frontend development, internships, and continuous learning
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 hidden sm:block"></div>

          <div className="space-y-8">
            <div className="experience-item group">
              <div className="relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 ml-0 sm:ml-16">
                <div className="absolute -left-3 top-8 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 hidden sm:block group-hover:scale-125 transition-transform duration-300"></div>

                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                    Current
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                    {currentJob.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-blue-400 font-semibold text-lg">
                    <span className="flex items-center space-x-2">
                      <Briefcase size={18} />
                      <span>{currentJob.company}</span>
                    </span>
                    <span className="hidden md:inline text-gray-600">•</span>
                    <span className="flex items-center space-x-2 text-gray-400">
                      <MapPin size={16} />
                      <span>{currentJob.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400 mb-6">
                  <Calendar size={16} />
                  <span className="text-sm">{currentJob.period}</span>
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20">
                    {currentJob.type}
                  </span>
                </div>

                <ul className="space-y-3">
                  {currentJob.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-gray-300 leading-relaxed">
                      <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="experience-divider relative my-12">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent origin-left"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-gray-900 border border-gray-600 rounded-full">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">
                  Internships & Courses
                </h3>
              </div>
            </div>

            {experiences.map((experience, index) => (
              <div key={index} className="experience-item group">
                <div className="relative bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-500 ml-0 sm:ml-16 transform hover:-translate-y-2">
                  <div className="absolute -left-3 top-8 w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-4 border-gray-900 hidden sm:block group-hover:scale-125 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"></div>

                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                      {experience.title}
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-300 font-medium">
                      <span className="flex items-center space-x-2">
                        <Briefcase size={16} />
                        <span>{experience.company}</span>
                      </span>
                      <span className="hidden md:inline text-gray-600">•</span>
                      <span className="flex items-center space-x-2 text-gray-400 text-sm">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400 mb-6">
                    <Calendar size={16} />
                    <span className="text-sm">{experience.period}</span>
                    <span className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs font-medium rounded-full border border-gray-600/30">
                      {experience.type}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        <ChevronRight className="text-gray-500 group-hover:text-purple-400 flex-shrink-0 mt-1 transition-colors duration-300" size={18} />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
