'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createCodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const chars = ['0', '1', 'x', 'f'];
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, 32, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function VectorTower() {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef<Float32Array | null>(null);
  const isBlueRef = useRef<Uint8Array | null>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const codeTexture = useMemo(() => createCodeTexture(), []);

  // Create point cloud in cylindrical tower shape
  const { positions, velocities, colors, isBlue } = useMemo(() => {
    // Baseline testing for GPU overhead.
    const count = 6500; // Total particles
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const isBlue = new Uint8Array(count);

    const height = 22; // Tower height
    const radius = 5; // Tower radius
    const shellThickness = 1.2; // Depth of the shell

    // Color palettes
    const emerald = new THREE.Color('#004235');
    const lightBlue = new THREE.Color('#004235');

    const rand = (() => {
      let seed = 123456789;
      return () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };
    })();

    for (let i = 0; i < count; i++) {
      // Distribute points in a cylindrical shell
      const angle = rand() * Math.PI * 2;
      const y = (rand() - 0.5) * height;
      const r = radius - rand() * shellThickness;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random velocity for vertical streaming (reduced by 52%)
      velocities[i] = rand() * 0.0096 + 0.0048;

      // 96% Emerald, 4% Light Blue
      const useBlue = rand() < 0.04;
      isBlue[i] = useBlue ? 1 : 0;
      const color = useBlue ? lightBlue : emerald;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, velocities, colors, isBlue };
  }, []);

  useEffect(() => {
    velocitiesRef.current = velocities;
    colorsRef.current = colors;
    isBlueRef.current = isBlue;
  }, [velocities, colors, isBlue]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Sweeping Crane perspective - diagonal orbit with vertical movement (cinematic framing - slowed by 40%)
    state.camera.position.x = Math.sin(time * 0.18) * 24;
    state.camera.position.z = Math.cos(time * 0.18) * 24;
    state.camera.position.y = Math.sin(time * 0.06) * 7;
    state.camera.lookAt(0, 0, 0);

    // Animate points - vertical jitter/streaming
    if (pointsRef.current && velocitiesRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        const yIndex = i * 3 + 1;
        positions[yIndex] += velocitiesRef.current[i];

        // Wrap around when reaching top
        if (positions[yIndex] > 11) {
          positions[yIndex] = -11;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 10-second Neural Pulse - blue particles shine
    if (pointsRef.current && colorsRef.current && isBlueRef.current) {
      const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
      const cycleTime = time % 10; // 10-second cycle
      const lightBlue = new THREE.Color('#004235');

      // Pulse occurs from 0-1.5 seconds of each 10-second cycle
      if (cycleTime < 1.5) {
        const pulseIntensity = Math.sin((cycleTime / 1.5) * Math.PI); // Smooth sine wave

        for (let i = 0; i < colors.length / 3; i++) {
          if (isBlueRef.current[i] === 1) {
            const boosted = lightBlue.clone().multiplyScalar(1 + pulseIntensity * 1.5);
            colors[i * 3] = Math.min(boosted.r, 1);
            colors[i * 3 + 1] = Math.min(boosted.g, 1);
            colors[i * 3 + 2] = Math.min(boosted.b, 1);
          }
        }

        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      } else {
        // Reset blue particles to base color
        for (let i = 0; i < colors.length / 3; i++) {
          if (isBlueRef.current[i] === 1) {
            colors[i * 3] = lightBlue.r;
            colors[i * 3 + 1] = lightBlue.g;
            colors[i * 3 + 2] = lightBlue.b;
          }
        }
      }
    }

    // Slow rotation of entire tower (reduced by 40% for monumental feel)
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.4}
        map={codeTexture}
        vertexColors
        transparent={false}
        opacity={1.0}
        sizeAttenuation
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function VaultVisual() {
  return (
    <div className="fixed inset-0 w-full h-screen" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [24, 0, 0], fov: 45 }}
        className="pointer-events-none"
      >
        <VectorTower />
      </Canvas>
    </div>
  );
}
