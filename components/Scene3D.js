'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, Octahedron, Float, Environment, Stars } from '@react-three/drei';

function FloatingShapes() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 4;
    group.current.position.y = Math.sin(t / 2) / 4;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Torus args={[1.5, 0.4, 16, 100]} position={[-2, 1, -2]} rotation={[Math.PI / 4, 0.5, 0]}>
          <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.8} />
        </Torus>
      </Float>
      
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
        <Octahedron args={[1.2]} position={[3, -1, -3]} rotation={[0, Math.PI / 3, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
        </Octahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[2, 2.5, -1]}>
          <meshStandardMaterial color="#d97706" roughness={0.3} metalness={0.7} />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[0.4, 32, 32]} position={[-3, -1.5, -1]}>
          <meshStandardMaterial color="#fcd34d" roughness={0.2} metalness={0.9} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#f59e0b" />
        <FloatingShapes />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
