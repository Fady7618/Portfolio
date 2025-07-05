import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: { position?: [number, number, number]; scale?: number | [number, number, number] }) {
  const modelRef = useRef<THREE.Group>(null);
  // Fix 1: Remove unused 'nodes' variable
  const { scene } = useGLTF('src/model/Character.glb');
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Clone the scene to avoid modifying the cached original
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    setModelLoaded(true);
    return clone;
  }, [scene]);
  
  useFrame((state) => {
    if (modelRef.current) {
      // Gentle breathing effect
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.01;
      modelRef.current.scale.setScalar(breathingScale);
      
      // Subtle rotation for liveliness
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05,
        0.05
      );
    }
  });
  
  return (
    <>
      {!modelLoaded && <mesh><sphereGeometry args={[0.2, 16, 16]} /><meshBasicMaterial color="red" /></mesh>}
      <primitive 
        ref={modelRef} 
        object={clonedScene} 
        position={props.position || [0, 0, 0]} 
        scale={props.scale || 1}
        rotation={[0, Math.PI, 0]} // Rotate to face camera
      />
    </>
  );
}

const CharacterModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 1, 2], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Fix 2: Replace contactShadow with shadows property */}
        <Stage environment="city" intensity={0.6} shadows={false}>
          <Model position={[0, -1, 0]} scale={1} />
        </Stage>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  );
};

export default CharacterModel;