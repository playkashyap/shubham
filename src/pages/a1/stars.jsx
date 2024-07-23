import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const Stars = () => {
    const group = useRef();
    const [positions] = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            positions.push(x, y, z);
        }
        return [new Float32Array(positions)];
    }, []);

    useFrame(() => {
        group.current.rotation.y += 0.0005;
    });

    return (
        <group ref={group}>
            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attachObject={['attributes', 'position']}
                        array={positions}
                        count={positions.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial attach="material" color="white" size={0.5} />
            </points>
        </group>
    );
};

export default Stars;
