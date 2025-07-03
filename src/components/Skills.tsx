import { useEffect, useRef } from 'react';
import { Code2, Database, Globe, Palette, Smartphone, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set('.skill-category', { opacity: 0, y: 50 });
      gsap.set('.progress-bar', { width: 0 });

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

      // Skills categories animation
      gsap.to('.skill-category', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Progress bars animation
      document.querySelectorAll('.progress-bar').forEach((bar) => {
        const percentage = bar.getAttribute('data-percentage') || '0';
        gsap.to(bar, {
          width: `${percentage}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript ES6+', level: 95 },
        { name: 'HTML5/CSS3', level: 98 },
        { name: 'Angular', level: 80 },
      ],
    },
    {
      title: 'Styling & Design',
      icon: <Palette className="w-6 h-6" />,
      skills: [
        { name: 'bootstrap', level: 95 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Sass/SCSS', level: 88 },
        { name: 'CSS-in-JS', level: 85 },
        { name: 'Responsive Design', level: 96 },
      ],
    },
    {
      title: 'Tools & Frameworks',
      icon: <Zap className="w-6 h-6" />,
      skills: [
        { name: 'Git/GitHub', level: 94 },
        { name: 'Webpack/Vite', level: 82 },
        { name: 'Jest/Testing Library', level: 78 },
        { name: 'Figma/Adobe XD', level: 75 },
      ],
    },
    {
      title: 'Backend & Database',
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 85 },
        { name: 'GraphQL', level: 70 },
        { name: 'MongoDB/PostgreSQL', level: 75 },
      ],
    },
    {
      title: 'Mobile & Cross-Platform',
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        { name: 'React Native', level: 82 },
        { name: 'Progressive Web Apps', level: 88 },
        { name: 'Responsive Design', level: 95 },
        { name: 'Mobile-First Approach', level: 90 },
      ],
    },
    {
      title: 'Web Technologies',
      icon: <Globe className="w-6 h-6" />,
      skills: [
        { name: 'Web Performance', level: 85 },
        { name: 'SEO Optimization', level: 80 },
        { name: 'Accessibility (a11y)', level: 78 },
        { name: 'Web Security', level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gray-800 relative">
      {/* Vertical lines in sidebars */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-transparent to-blue-400 opacity-20"></div>
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 via-transparent to-purple-400 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
            across various technologies and tools.
          </p>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-category bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 mx-auto max-w-[350px] w-full"
            >
              <div className="flex items-center mb-6">
                <div className="text-blue-400 mr-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="progress-bar bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        data-percentage={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;