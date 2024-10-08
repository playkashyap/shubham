/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 neptune.glb 
Author: SebastianSosnowski (https://sketchfab.com/SebastianSosnowski)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/neptune-fe05e06a265d4a8f9285d34c933878ee
Title: Neptune
*/


//neptune is 28.32 degrees tilted on its axis

import React from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Starfield from './stars';
import { Box3, Sphere, Vector3 } from 'three';

export function Model(props) {

  const ref = React.useRef()
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/neptune.glb')
  const { actions } = useAnimations(animations, group);
  const [radius, setRadius] = React.useState(0);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  })

  React.useEffect(() => {
    if (group.current) {
      const box = new Box3().setFromObject(group.current);
      const sphere = new Sphere();
      box.getBoundingSphere(sphere);
      setRadius(sphere.radius);
    }
  }, [group.current]);

  return (
    <>
      <Starfield count={10000} planetRadius={radius} velocityScale={0.3}/>
      <mesh>
        <group ref={group} {...props} rotation={props.angle} dispose={null}>
          <group name="Sketchfab_Scene" ref={ref}>
            <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
              <group name="943e82ae1e91464bb6057ce325b1063bfbx" rotation={[Math.PI / 2, 0, 0]}>
                <group name="Object_2">
                  <group name="RootNode">
                    <group name="Planeta" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh name="Planeta_Planeta_0" geometry={nodes.Planeta_Planeta_0.geometry} material={materials.Planeta} />
                    </group>
                    <group name="Atmosfera" rotation={[-Math.PI / 2, 0, 0]} scale={1.005}>
                      <mesh name="Atmosfera_Atmosfera_0" geometry={nodes.Atmosfera_Atmosfera_0.geometry} material={materials.Atmosfera} />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>

      </mesh>
    </>
  )
}

useGLTF.preload('/neptune.glb')
