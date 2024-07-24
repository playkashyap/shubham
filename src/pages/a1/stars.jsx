import React, { useMemo, useRef } from 'react';
import { Points, BufferGeometry, BufferAttribute, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

function Starfield({ count = 5000, planetRadius = 50, velocityScale = 0.1 }) {
  const pointsRef = useRef();

  // Create star positions and velocities
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3); // RGB color for each star

    for (let i = 0; i < count; i++) {
      let x, y, z, distance;
      do {
        x = (Math.random() - 0.5) * 2 * planetRadius * 10;
        y = (Math.random() - 0.5) * 2 * planetRadius * 10;
        z = (Math.random() - 0.5) * 2 * planetRadius * 10;
        distance = Math.sqrt(x * x + y * y + z * z);
      } while (distance < planetRadius * 1.5); // Ensure the point is outside the planet's radius

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities[i * 3] = (x / distance) * velocityScale;
      velocities[i * 3 + 1] = (y / distance) * velocityScale;
      velocities[i * 3 + 2] = (z / distance) * velocityScale;

      // Randomly assign brightness
      const brightness = Math.random() * 0.5 + 0.5; // Random value between 0.5 and 1.0
      sizes[i] = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2.0
      colors[i * 3] = brightness; // Red
      colors[i * 3 + 1] = brightness; // Green
      colors[i * 3 + 2] = brightness; // Blue
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    return geometry;
  }, [count, planetRadius, velocityScale]);

  useFrame(() => {
    const positions = pointsRef.current.geometry.attributes.position.array;
    const velocities = pointsRef.current.geometry.attributes.velocity.array;
    for (let i = 0; i < count * 3; i++) {
      positions[i] += velocities[i];
      if (Math.abs(positions[i]) > 500) {
        positions[i] = (Math.random() - 0.5) * 2 * planetRadius * 10;
        velocities[i] = (positions[i] / Math.abs(positions[i])) * velocityScale;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Create a PointsMaterial that uses vertex colors and sizes
  const material = useMemo(() => new PointsMaterial({
    size: 0.5,
    vertexColors: true, // Enable vertex colors
    sizeAttenuation: true,
  }), []);

  return <points ref={pointsRef} geometry={points} material={material} />;
}

export default Starfield;
