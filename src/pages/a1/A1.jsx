import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Neptune';

import "./style.css";
export const A1 = () => {

    const tiltAngle = -28.32 * (Math.PI / 180);

    return (
        <>
            <Canvas
                camera={{ position: [2, 10, 60], fov: 25 }}
                className='canvas'
            >
                <ambientLight intensity={1.25} />
                <ambientLight intensity={0.1} />
                <Suspense fallback={null}>
                    <group rotation={[0, 0, tiltAngle]}>
                        <Model position={[0.1, 2, 0]} />
                    </group>
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </>

    );
};