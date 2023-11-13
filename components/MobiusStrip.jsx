import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const MobiusStrip = () => {
  const positions = calculateMobiusStrip(); // Function to calculate Mobius strip positions

  return (
    <div className="relative">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
        className="bg-slate-900"
      >
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <MobiusStripPoints positions={positions} />
      </Canvas>

      <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
        Drag & Zoom
      </h1>
    </div>
  );
};

const calculateMobiusStrip = () => {
  const numPoints = 1000;
  const stripRadius = 6;
  const twistFactor = 1;
  const positions = [];

  for (let i = 0; i < numPoints; i++) {
    const u = (i / numPoints) * 2 * Math.PI;
    const v = (i / numPoints) * stripRadius;

    const x = (1 + v * Math.cos(u / 2)) * Math.cos(u);
    const y = (1 + v * Math.cos(u / 2)) * Math.sin(u);
    const z = v * Math.sin(u / 2) * twistFactor;

    positions.push([x, y, z]);
  }

  return positions;
};

const MobiusStripPoints = ({ positions }) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
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
        emissive="pink"
        emissiveIntensity={0.5}
        roughness={0.5}
        color="yellow"
      />
    </Sphere>
  );
};

export default MobiusStrip;
