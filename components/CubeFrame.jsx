import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const CubeWireframeEdgesOnly = () => {
  const positions = calculateCubeWireframeEdgesOnly(); // Function to calculate cube positions

  return (
    <div className="relative">
      <Canvas
        camera={{
          position: [10, -7.5, -7.5],
        }}
        style={{ height: "100vh" }}
        className="bg-slate-900"
      >
        <OrbitControls maxDistance={5} minDistance={5} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={30.0} />
        <CubeEdgesOnlyPoints positions={positions} />
      </Canvas>

      <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
        Drag & Zoom
      </h1>
    </div>
  );
};

const calculateCubeWireframeEdgesOnly = () => {
  const spacing = 2; // Adjust as needed
  const size = 4; // Adjust as needed
  const positions = [];

  for (let x = -size; x <= size; x += spacing) {
    for (let y = -size; y <= size; y += spacing) {
      for (let z = -size; z <= size; z += spacing) {
        if (
          Math.abs(x) === size ||
          Math.abs(y) === size ||
          Math.abs(z) === size ||
          (Math.abs(x) === size - spacing && Math.abs(y) === size - spacing) ||
          (Math.abs(y) === size - spacing && Math.abs(z) === size - spacing) ||
          (Math.abs(z) === size - spacing && Math.abs(x) === size - spacing)
        ) {
          positions.push([x, y, z]);
        }
      }
    }
  }

  return positions;
};

const CubeEdgesOnlyPoints = ({ positions }) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <group ref={ref}>
      {positions.map((position, index) => (
        <Point key={index} position={position} />
      ))}
    </group>
  );
};

const Point = ({ position }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive="purple"
        emissiveIntensity={1.0}
        roughness={0.1}
        color="orange"
      />
    </Sphere>
  );
};

export default CubeWireframeEdgesOnly;
