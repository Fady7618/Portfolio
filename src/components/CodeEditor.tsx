import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CodeEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  
  // Add refs to track animation state
  const animationState = useRef({
    typeInterval: null as ReturnType<typeof setInterval> | null,
    currentText: '',
    index: 0,
    isPaused: false,
    snippetTimeout: null as ReturnType<typeof setTimeout> | null
  });

  // Update your code snippets array with more distinctive content for each language
  const codeSnippets = [
    {
      language: 'React',
      code: `const Portfolio = () => {
  const [isAwesome, setIsAwesome] = useState(true);
  
  useEffect(() => {
    console.log('Welcome to my portfolio!');
  }, []);

  return (
    <div className="developer">
      <h1>Fady Alfred</h1>
      <p>Frontend Developer</p>
    </div>
  );
};`
    },
    {
      language: 'JavaScript',
      code: `// Pure JavaScript, no React
function createAmazingWebsite() {
  const skills = ['React', 'TypeScript', 'CSS'];
  const passion = 'Frontend Development';
  
  console.log('Welcome To My Portfolio!');
  
  return skills.map(skill => 
    skill + ' + ' + passion + ' = Magic ✨'
  );
}

createAmazingWebsite();`
    },
    {
      language: 'CSS',
      code: `/* CSS Styling */
.developer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: breathe 3s ease-in-out infinite;
}`
    }
  ];

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause the animation
        animationState.current.isPaused = true;
        
        // Clear any ongoing intervals
        if (animationState.current.typeInterval) {
          clearInterval(animationState.current.typeInterval);
          animationState.current.typeInterval = null;
        }
        
        if (animationState.current.snippetTimeout) {
          clearTimeout(animationState.current.snippetTimeout);
          animationState.current.snippetTimeout = null;
        }
      } else {
        // Page is visible again, resume the animation
        if (animationState.current.isPaused) {
          animationState.current.isPaused = false;
          
          // Resume typing from where we left off
          typeCode();
        }
      }
    };

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Clean up any intervals on unmount
      if (animationState.current.typeInterval) {
        clearInterval(animationState.current.typeInterval);
      }
      if (animationState.current.snippetTimeout) {
        clearTimeout(animationState.current.snippetTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Window slide-in animation
      gsap.fromTo(containerRef.current, 
        { 
          y: 50, 
          opacity: 0,
          scale: 0.9 
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 1
        }
      );

      // Start typing animation with a delay
      setTimeout(() => {
        typeCode();
      }, 1500);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Reset animation state when the snippet changes
  useEffect(() => {
    animationState.current.currentText = '';
    animationState.current.index = 0;
    
    // Clear any ongoing animation when the snippet changes
    if (animationState.current.typeInterval) {
      clearInterval(animationState.current.typeInterval);
      animationState.current.typeInterval = null;
    }
  }, [currentSnippet]);

  // Update this function to escape HTML characters
  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const typeCode = (snippetIndex = currentSnippet) => {
    // If already paused or an interval is running, don't start a new one
    if (animationState.current.isPaused || animationState.current.typeInterval) {
      return;
    }
    
    // Use the explicitly provided snippetIndex parameter
    const snippet = codeSnippets[snippetIndex];
    const code = snippet.code;
    
    // Reset typing position if this is a new snippet
    if (animationState.current.index === 0) {
      animationState.current.currentText = '';
      if (codeRef.current) {
        codeRef.current.innerHTML = '<span class="inline-block w-2 h-5 bg-green-400 ml-0 animate-pulse"></span>';
      }
    }

    animationState.current.typeInterval = setInterval(() => {
      // If paused or element no longer exists, stop typing
      if (animationState.current.isPaused || !codeRef.current) {
        if (animationState.current.typeInterval) {
          clearInterval(animationState.current.typeInterval);
          animationState.current.typeInterval = null;
        }
        return;
      }
      
      if (animationState.current.index < code.length) {
        animationState.current.currentText += code[animationState.current.index];
        
        if (codeRef.current) {
          // Explicitly escape the full text each time
          const escapedText = escapeHtml(animationState.current.currentText);
          
          // Add cursor at the end of escaped text
          codeRef.current.innerHTML = escapedText + 
            '<span class="inline-block w-2 h-5 bg-green-400 ml-0 animate-pulse"></span>';
          
          // Auto-scroll to keep cursor in view
          const container = codeRef.current.parentElement;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }
        
        animationState.current.index++;
      } else {
        // Clear the interval when done typing
        if (animationState.current.typeInterval) {
          clearInterval(animationState.current.typeInterval);
          animationState.current.typeInterval = null;
        }
        
        // Wait 3 seconds then switch to next snippet
        animationState.current.snippetTimeout = setTimeout(() => {
          // First, completely clear all state and content
          if (codeRef.current) {
            codeRef.current.innerHTML = '';
            
            const container = codeRef.current.parentElement;
            if (container) {
              container.scrollTop = 0;
            }
          }
          
          // Reset animation state before changing snippet
          animationState.current.currentText = '';
          animationState.current.index = 0;
          
          // Calculate next snippet index
          const nextSnippetIndex = (snippetIndex + 1) % codeSnippets.length;
          
          // Update to the next snippet
          setCurrentSnippet(nextSnippetIndex);
          
          // Clear the timeout reference
          animationState.current.snippetTimeout = null;
          
          // Start typing the next snippet after a short delay
          // Pass the next snippet index explicitly
          setTimeout(() => typeCode(nextSnippetIndex), 500);
        }, 3000);
      }
    }, 50);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-start justify-center"
    >
      {/* Code Editor Window */}
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
        {/* Window Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            {codeSnippets[currentSnippet].language}
          </div>
          <div className="w-16"></div>
        </div>

        {/* Line Numbers */}
        <div className="flex">
          <div className="bg-gray-800 px-3 py-4 text-gray-500 text-sm font-mono leading-6 select-none overflow-y-auto">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>

          {/* Code Content with fixed height */}
          <div className="flex-1 p-4 bg-gray-900 relative h-[270px] overflow-y-auto">
            <pre 
              ref={codeRef}
              className="text-green-400 font-mono text-sm leading-6 whitespace-pre-wrap"
            ></pre>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-blue-600 px-4 py-2 text-white text-xs font-mono flex justify-between">
          <span>✓ Ready</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 -right-8 w-4 h-4 bg-green-500 rounded-full opacity-25 animate-bounce"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-xl"></div>
    </div>
  );
};

export default CodeEditor;