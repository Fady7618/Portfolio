import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Character = () => {
  const meshRef = useRef<THREE.Group>(null);
  const typingRefs = useRef({
    leftHand: null as THREE.Group | null,
    rightHand: null as THREE.Group | null,
  });
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Look at mouse cursor (subtle)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mousePosition.x * 0.05,
        0.05
      );
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mousePosition.y * 0.02,
        0.05
      );
      
      // Gentle breathing effect
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.01;
      meshRef.current.scale.setScalar(breathingScale);
      
      // Typing animation
      if (typingRefs.current.leftHand && typingRefs.current.rightHand) {
        typingRefs.current.leftHand.position.y = 0.49 + Math.sin(state.clock.elapsedTime * 8) * 0.02;
        typingRefs.current.rightHand.position.y = 0.49 + Math.sin((state.clock.elapsedTime + 0.5) * 8) * 0.02;
      }
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.6, 0]}>
      {/* Head - smooth round head */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#e6b89c" />
      </mesh>
      
      {/* Face base - lighter skin tone */}
      <mesh position={[0, 1.35, 0.32]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#f5d0b5" />
      </mesh>

      {/* Eyes with more definition */}
      <group position={[0, 1.35, 0.33]}>
        {/* Left eye white */}
        <mesh position={[-0.08, 0.06, 0.01]}>
          <circleGeometry args={[0.045, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Left eye pupil */}
        <mesh position={[-0.08, 0.06, 0.02]}>
          <circleGeometry args={[0.025, 32]} />
          <meshStandardMaterial color="#413c39" />
        </mesh>
        
        {/* Right eye white */}
        <mesh position={[0.08, 0.06, 0.01]}>
          <circleGeometry args={[0.045, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Right eye pupil */}
        <mesh position={[0.08, 0.06, 0.02]}>
          <circleGeometry args={[0.025, 32]} />
          <meshStandardMaterial color="#413c39" />
        </mesh>
        
        {/* Left eyelid */}
        <mesh position={[-0.08, 0.11, 0.015]}>
          <planeGeometry args={[0.09, 0.02]} />
          <meshStandardMaterial color="#d4a88e" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Right eyelid */}
        <mesh position={[0.08, 0.11, 0.015]}>
          <planeGeometry args={[0.09, 0.02]} />
          <meshStandardMaterial color="#d4a88e" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Eyebrows - thicker and more visible */}
        <mesh position={[-0.08, 0.13, 0.015]}>
          <boxGeometry args={[0.07, 0.015, 0.005]} />
          <meshStandardMaterial color="#6e564a" />
        </mesh>
        <mesh position={[0.08, 0.13, 0.015]}>
          <boxGeometry args={[0.07, 0.015, 0.005]} />
          <meshStandardMaterial color="#6e564a" />
        </mesh>
        
        {/* Mouth - more defined */}
        <group position={[0, -0.06, 0.01]}>
          {/* Outer mouth shape - using curved shape */}
          <mesh rotation={[0, 0, Math.PI]}>
            <ringGeometry args={[0.04, 0.06, 32, 1, 0, Math.PI]} />
            <meshStandardMaterial color="#d64f47" side={THREE.DoubleSide} />
          </mesh>
          
          {/* Inner mouth line */}
          <mesh position={[0, -0.01, 0.005]}>
            <boxGeometry args={[0.08, 0.003, 0.001]} />
            <meshStandardMaterial color="#a13b36" />
          </mesh>
        </group>
      </group>
      
      {/* Hair - more styled, rounded hair */}
      <group position={[0, 1.5, 0]}>
        {/* Main hair volume */}
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color="#202020" />
        </mesh>
        
        {/* Side styling */}
        <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, Math.PI * 0.15]} scale={[0.5, 1, 1]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.2, -0.1, 0]} rotation={[0, 0, -Math.PI * 0.15]} scale={[0.5, 1, 1]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
      
      {/* Torso - dark gray t-shirt */}
      <mesh position={[0, 0.9, 0]} scale={[1, 1.2, 0.8]}>
        <boxGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.25, 0.9, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0.25, 0.9, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Forearms angled toward keyboard */}
      <mesh position={[-0.25, 0.7, 0.2]} rotation={[Math.PI * 0.25, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>
      <mesh position={[0.25, 0.7, 0.2]} rotation={[Math.PI * 0.25, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#d4a373" />
      </mesh>

      {/* Hands with proper wrist connection - adjusted position to connect seamlessly */}
      <group 
        position={[-0.25, 0.49, 0.41]} 
        rotation={[Math.PI * 0.25, 0, 0]}
        ref={(mesh) => { typingRefs.current.leftHand = mesh; }}
      >
        {/* Palm */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.02, 0.1]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        
        {/* Thumb */}
        <mesh position={[-0.04, 0, 0.02]} rotation={[0, 0, Math.PI * 0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        
        {/* Fingers */}
        <mesh position={[-0.02, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[0.02, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.075, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[0.04, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
      </group>

      <group 
        position={[0.25, 0.49, 0.41]} 
        rotation={[Math.PI * 0.25, 0, 0]}
        ref={(mesh) => { typingRefs.current.rightHand = mesh; }}
      >
        {/* Palm */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.02, 0.1]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        
        {/* Thumb */}
        <mesh position={[0.04, 0, 0.02]} rotation={[0, 0, -Math.PI * 0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        
        {/* Fingers */}
        <mesh position={[0.02, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[-0.02, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.075, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
        <mesh position={[-0.04, 0, 0.1]} rotation={[Math.PI * 0.1, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>
      </group>
      
      {/* Pants - black */}
      <mesh position={[0, 0.6, 0.1]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.35, 0.2, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.1, 0.4, 0.3]} rotation={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0.1, 0.4, 0.3]} rotation={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Shoes - black and white */}
      <group position={[-0.1, 0.25, 0.5]}>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.04, 0.15]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[0.1, 0.25, 0.5]}>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.08, 0.04, 0.15]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      
      {/* Chair - modern design */}
      <group>
        {/* Chair seat */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.35, 0.05, 0.35]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Chair back */}
        <mesh position={[0, 0.7, -0.17]}>
          <boxGeometry args={[0.35, 0.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Chair legs and base */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        
        {/* Chair base */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        
        {/* Chair support frame - "Z" shape */}
        <mesh position={[0, 0.2, 0.1]} rotation={[Math.PI * 0.2, 0, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.2]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        <mesh position={[0, 0.1, 0.2]}>
          <boxGeometry args={[0.05, 0.05, 0.1]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      </group>
      
      {/* Modern white desk */}
      <mesh position={[0, 0.4, 0.6]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Desk legs */}
      <mesh position={[-0.8, 0.2, 0.6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#f0e6d2" />
      </mesh>
      <mesh position={[0.8, 0.2, 0.6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#f0e6d2" />
      </mesh>
      <mesh position={[-0.8, 0.2, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#f0e6d2" />
      </mesh>
      <mesh position={[0.8, 0.2, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
        <meshStandardMaterial color="#f0e6d2" />
      </mesh>
      
      {/* Monitors with code */}
      <group position={[-0.4, 0.7, 0.75]} rotation={[0, -0.1, 0]}>
        {/* Monitor frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.03]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        
        {/* Monitor screen */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.48, 0.33, 0.01]} />
          <meshStandardMaterial 
            color="#2d2d2d" 
            emissive="#2d2d2d" 
            emissiveIntensity={0.4} 
          />
        </mesh>
        
        {/* Code on screen - blue tinted */}
        <group position={[0, 0, 0.011]} scale={[1, 1, 0.01]}>
          <mesh position={[-0.15, 0.1, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.005]} />
            <meshStandardMaterial color="#5d8aff" emissive="#5d8aff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.1, 0.08, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.005]} />
            <meshStandardMaterial color="#86b1ff" emissive="#86b1ff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.12, 0.06, 0]}>
            <boxGeometry args={[0.25, 0.01, 0.005]} />
            <meshStandardMaterial color="#5d8aff" emissive="#5d8aff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.08, 0.04, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.005]} />
            <meshStandardMaterial color="#ff8a5d" emissive="#ff8a5d" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.13, 0.02, 0]}>
            <boxGeometry args={[0.22, 0.01, 0.005]} />
            <meshStandardMaterial color="#5dff8a" emissive="#5dff8a" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.15, 0, 0]}>
            <boxGeometry args={[0.18, 0.01, 0.005]} />
            <meshStandardMaterial color="#86b1ff" emissive="#86b1ff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.1, -0.02, 0]}>
            <boxGeometry args={[0.28, 0.01, 0.005]} />
            <meshStandardMaterial color="#5d8aff" emissive="#5d8aff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.13, -0.04, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.005]} />
            <meshStandardMaterial color="#ff8a5d" emissive="#ff8a5d" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.14, -0.06, 0]}>
            <boxGeometry args={[0.15, 0.01, 0.005]} />
            <meshStandardMaterial color="#86b1ff" emissive="#86b1ff" emissiveIntensity={0.8} />
          </mesh>
        </group>
        
        {/* Monitor stand */}
        <mesh position={[0, -0.2, 0.03]}>
          <boxGeometry args={[0.1, 0.08, 0.08]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, -0.25, 0.07]}>
          <boxGeometry args={[0.15, 0.02, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      <group position={[0.4, 0.7, 0.75]} rotation={[0, 0.1, 0]}>
        {/* Monitor frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.03]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        
        {/* Monitor screen */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[0.48, 0.33, 0.01]} />
          <meshStandardMaterial 
            color="#2d2d2d" 
            emissive="#2d2d2d" 
            emissiveIntensity={0.4} 
          />
        </mesh>
        
        {/* Code on screen - colorful syntax highlighting */}
        <group position={[0, 0, 0.011]} scale={[1, 1, 0.01]}>
          <mesh position={[-0.15, 0.1, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.005]} />
            <meshStandardMaterial color="#ffcb6b" emissive="#ffcb6b" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.1, 0.08, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.005]} />
            <meshStandardMaterial color="#c3e88d" emissive="#c3e88d" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.12, 0.06, 0]}>
            <boxGeometry args={[0.25, 0.01, 0.005]} />
            <meshStandardMaterial color="#f78c6c" emissive="#f78c6c" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.08, 0.04, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.005]} />
            <meshStandardMaterial color="#c792ea" emissive="#c792ea" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.13, 0.02, 0]}>
            <boxGeometry args={[0.22, 0.01, 0.005]} />
            <meshStandardMaterial color="#82aaff" emissive="#82aaff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.15, 0, 0]}>
            <boxGeometry args={[0.18, 0.01, 0.005]} />
            <meshStandardMaterial color="#c3e88d" emissive="#c3e88d" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.1, -0.02, 0]}>
            <boxGeometry args={[0.28, 0.01, 0.005]} />
            <meshStandardMaterial color="#ffcb6b" emissive="#ffcb6b" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.13, -0.04, 0]}>
            <boxGeometry args={[0.2, 0.01, 0.005]} />
            <meshStandardMaterial color="#f78c6c" emissive="#f78c6c" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.14, -0.06, 0]}>
            <boxGeometry args={[0.15, 0.01, 0.005]} />
            <meshStandardMaterial color="#c792ea" emissive="#c792ea" emissiveIntensity={0.8} />
          </mesh>
        </group>
        
        {/* Monitor stand */}
        <mesh position={[0, -0.2, 0.03]}>
          <boxGeometry args={[0.1, 0.08, 0.08]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, -0.25, 0.07]}>
          <boxGeometry args={[0.15, 0.02, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0.42, 0.5]}>
        <boxGeometry args={[0.5, 0.02, 0.18]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.43, 0.5]}>
        <boxGeometry args={[0.48, 0.02, 0.16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.3, 0.42, 0.4]} rotation={[Math.PI/2, 0, 0]}>
        <capsuleGeometry args={[0.03, 0.06, 8, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Cup/Mug */}
      <group position={[-0.7, 0.45, 0.8]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <torusGeometry args={[0.03, 0.01, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      
      {/* Small plant */}
      <group position={[0.7, 0.45, 0.8]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
        <group position={[0, 0.08, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#4CAF50" />
          </mesh>
          <mesh position={[0, 0.05, 0.05]} rotation={[Math.PI/6, 0, 0]}>
            <coneGeometry args={[0.05, 0.15, 16]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>
          <mesh position={[0.05, 0.05, -0.03]} rotation={[Math.PI/6, Math.PI/3, 0]}>
            <coneGeometry args={[0.04, 0.12, 16]} />
            <meshStandardMaterial color="#4CAF50" />
          </mesh>
          <mesh position={[-0.05, 0.05, -0.03]} rotation={[Math.PI/6, -Math.PI/3, 0]}>
            <coneGeometry args={[0.04, 0.12, 16]} />
            <meshStandardMaterial color="#66BB6A" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const Character3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 1.2, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffecd9" />
        <spotLight 
          position={[0, 5, 2]} 
          intensity={0.8} 
          color="#ffffff" 
          angle={0.6}
          penumbra={0.5}
          castShadow
        />
        <directionalLight
          position={[1, 2, 3]}
          intensity={0.5}
          color="#fef3c7"
        />
        <Character />
      </Canvas>
    </div>
  );
};

export default Character3D;