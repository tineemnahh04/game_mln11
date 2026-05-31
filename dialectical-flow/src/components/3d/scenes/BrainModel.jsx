import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../../store/useGameStore';
import * as THREE from 'three';

const BrainModel = () => {
  const groupRef = useRef();
  const viewState = useGameStore(state => state.viewState);
  const setViewState = useGameStore(state => state.setViewState);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setViewState('HUB'); // Go directly to HUB
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1) * 0.05;
    }
  });

  // Only render if in START
  if (viewState !== 'START') return null;

  return (
    <group 
      ref={groupRef} 
      onClick={handleClick} 
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      position={[0, 0, 0]}
    >
      <mesh scale={hovered ? 1.1 : 1}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export default BrainModel;
