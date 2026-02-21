"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const AMBER = "#E8A838";
const AMBER_DARK = "#C98A20";
const CREAM = "#F5DEB3";
const BLACK = "#2D2D2D";
const PINK = "#FF9999";
const TONGUE = "#E85A71";

function Dog() {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const tailRef = useRef<THREE.Mesh>(null!);
  const tongueRef = useRef<THREE.Mesh>(null!);
  const frontLeftLeg = useRef<THREE.Group>(null!);
  const frontRightLeg = useRef<THREE.Group>(null!);
  const backLeftLeg = useRef<THREE.Group>(null!);
  const backRightLeg = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);

  const [phase, setPhase] = useState<"running" | "sitting" | "panting">("running");
  const timeRef = useRef(0);
  const phaseTimeRef = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("sitting"), 2000);
    const t2 = setTimeout(() => setPhase("panting"), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    phaseTimeRef.current = 0;
  }, [phase]);

  // Paw print trail
  const pawPrints = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      x: -4.5 + i * 1.2,
      z: i % 2 === 0 ? 0.15 : -0.15,
      delay: i * 0.15,
    }));
  }, []);
  const [showPaws, setShowPaws] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowPaws(true), 300);
    return () => clearTimeout(t);
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    phaseTimeRef.current += delta;
    const t = timeRef.current;
    const pt = phaseTimeRef.current;

    if (!groupRef.current) return;

    if (phase === "running") {
      // Move from left to center
      const progress = Math.min(pt / 2, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      groupRef.current.position.x = -5 + eased * 5;

      // Bounce
      groupRef.current.position.y = Math.abs(Math.sin(t * 8)) * 0.15;

      // Leg animation
      const legSpeed = 8;
      if (frontLeftLeg.current) frontLeftLeg.current.rotation.x = Math.sin(t * legSpeed) * 0.6;
      if (frontRightLeg.current) frontRightLeg.current.rotation.x = Math.sin(t * legSpeed + Math.PI) * 0.6;
      if (backLeftLeg.current) backLeftLeg.current.rotation.x = Math.sin(t * legSpeed + Math.PI) * 0.5;
      if (backRightLeg.current) backRightLeg.current.rotation.x = Math.sin(t * legSpeed) * 0.5;

      // Tail wag while running
      if (tailRef.current) tailRef.current.rotation.z = Math.sin(t * 10) * 0.3;

      // Body tilt
      if (bodyRef.current) bodyRef.current.rotation.z = Math.sin(t * 8) * 0.03;
    }

    if (phase === "sitting") {
      groupRef.current.position.x = 0;
      const sitProgress = Math.min(pt / 0.8, 1);
      const eased = 1 - Math.pow(1 - sitProgress, 2);

      // Lower back end
      groupRef.current.position.y = 0;
      if (bodyRef.current) bodyRef.current.rotation.x = THREE.MathUtils.lerp(0, -0.2, eased);

      // Front legs straight
      if (frontLeftLeg.current) frontLeftLeg.current.rotation.x = THREE.MathUtils.lerp(frontLeftLeg.current.rotation.x, 0, eased);
      if (frontRightLeg.current) frontRightLeg.current.rotation.x = THREE.MathUtils.lerp(frontRightLeg.current.rotation.x, 0, eased);

      // Back legs tucked
      if (backLeftLeg.current) backLeftLeg.current.rotation.x = THREE.MathUtils.lerp(backLeftLeg.current.rotation.x, -0.8, eased);
      if (backRightLeg.current) backRightLeg.current.rotation.x = THREE.MathUtils.lerp(backRightLeg.current.rotation.x, -0.8, eased);

      // Tail wag
      if (tailRef.current) tailRef.current.rotation.z = Math.sin(t * 6) * 0.4;
    }

    if (phase === "panting") {
      groupRef.current.position.x = 0;
      groupRef.current.position.y = 0;
      if (bodyRef.current) bodyRef.current.rotation.x = -0.2;

      // Breathing
      const breathe = Math.sin(t * 4) * 0.02;
      if (bodyRef.current) bodyRef.current.scale.setScalar(1 + breathe);

      // Head bob (panting)
      if (headRef.current) headRef.current.rotation.x = Math.sin(t * 5) * 0.05;

      // Tongue in and out
      if (tongueRef.current) {
        tongueRef.current.visible = true;
        tongueRef.current.scale.y = 0.8 + Math.sin(t * 5) * 0.2;
        tongueRef.current.position.y = -0.12 - Math.sin(t * 5) * 0.03;
      }

      // Mouth open
      if (mouthRef.current) {
        mouthRef.current.scale.y = 1 + Math.sin(t * 5) * 0.3;
      }

      // Tail happy wag
      if (tailRef.current) tailRef.current.rotation.z = Math.sin(t * 8) * 0.5;

      // Back legs stay tucked
      if (backLeftLeg.current) backLeftLeg.current.rotation.x = -0.8;
      if (backRightLeg.current) backRightLeg.current.rotation.x = -0.8;
      if (frontLeftLeg.current) frontLeftLeg.current.rotation.x = 0;
      if (frontRightLeg.current) frontRightLeg.current.rotation.x = 0;
    }
  });

  return (
    <>
      {/* Paw prints on the ground */}
      {showPaws &&
        pawPrints.map((paw, i) => (
          <mesh
            key={i}
            position={[paw.x, -0.69, paw.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.06, 8]} />
            <meshStandardMaterial
              color={AMBER_DARK}
              transparent
              opacity={phase === "running" ? 0.3 : 0.15}
            />
          </mesh>
        ))}

      <group ref={groupRef} position={[-5, 0, 0]}>
        <group ref={bodyRef}>
          {/* Body */}
          <mesh position={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.35, 0.6, 8, 16]} />
            <meshStandardMaterial color={AMBER} roughness={0.7} />
          </mesh>

          {/* Belly */}
          <mesh position={[0, -0.1, 0.15]}>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshStandardMaterial color={CREAM} roughness={0.8} />
          </mesh>

          {/* Head */}
          <group ref={headRef} position={[0.45, 0.2, 0]}>
            {/* Head sphere */}
            <mesh castShadow>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={AMBER} roughness={0.7} />
            </mesh>

            {/* Face cream patch */}
            <mesh position={[0.1, -0.05, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color={CREAM} roughness={0.8} />
            </mesh>

            {/* Left ear */}
            <mesh position={[-0.05, 0.25, 0.18]} rotation={[0.3, 0, 0.4]}>
              <coneGeometry args={[0.12, 0.25, 8]} />
              <meshStandardMaterial color={AMBER_DARK} roughness={0.7} />
            </mesh>

            {/* Right ear */}
            <mesh position={[-0.05, 0.25, -0.18]} rotation={[-0.3, 0, 0.4]}>
              <coneGeometry args={[0.12, 0.25, 8]} />
              <meshStandardMaterial color={AMBER_DARK} roughness={0.7} />
            </mesh>

            {/* Left eye */}
            <mesh position={[0.22, 0.08, 0.12]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color={BLACK} roughness={0.3} />
            </mesh>
            {/* Left eye shine */}
            <mesh position={[0.26, 0.1, 0.13]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>

            {/* Right eye */}
            <mesh position={[0.22, 0.08, -0.12]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color={BLACK} roughness={0.3} />
            </mesh>
            {/* Right eye shine */}
            <mesh position={[0.26, 0.1, -0.11]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>

            {/* Nose */}
            <mesh position={[0.3, -0.02, 0]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshStandardMaterial color={BLACK} roughness={0.2} metalness={0.3} />
            </mesh>

            {/* Mouth line */}
            <mesh ref={mouthRef} position={[0.25, -0.1, 0]} rotation={[0, 0, 0.2]}>
              <capsuleGeometry args={[0.015, 0.08, 4, 8]} />
              <meshStandardMaterial color={AMBER_DARK} roughness={0.8} />
            </mesh>

            {/* Tongue (hidden initially) */}
            <mesh ref={tongueRef} position={[0.26, -0.12, 0]} rotation={[0, 0, 0.6]} visible={false}>
              <capsuleGeometry args={[0.03, 0.1, 4, 8]} />
              <meshStandardMaterial color={TONGUE} roughness={0.6} />
            </mesh>

            {/* Cheeks */}
            <mesh position={[0.15, -0.05, 0.2]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={PINK} transparent opacity={0.4} roughness={0.9} />
            </mesh>
            <mesh position={[0.15, -0.05, -0.2]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color={PINK} transparent opacity={0.4} roughness={0.9} />
            </mesh>
          </group>

          {/* Tail */}
          <mesh ref={tailRef} position={[-0.55, 0.2, 0]} rotation={[0, 0, 0.8]}>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshStandardMaterial color={AMBER} roughness={0.7} />
          </mesh>

          {/* Front left leg */}
          <group ref={frontLeftLeg} position={[0.2, -0.3, 0.18]}>
            <mesh position={[0, -0.15, 0]}>
              <capsuleGeometry args={[0.07, 0.2, 4, 8]} />
              <meshStandardMaterial color={AMBER} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color={CREAM} roughness={0.8} />
            </mesh>
          </group>

          {/* Front right leg */}
          <group ref={frontRightLeg} position={[0.2, -0.3, -0.18]}>
            <mesh position={[0, -0.15, 0]}>
              <capsuleGeometry args={[0.07, 0.2, 4, 8]} />
              <meshStandardMaterial color={AMBER} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color={CREAM} roughness={0.8} />
            </mesh>
          </group>

          {/* Back left leg */}
          <group ref={backLeftLeg} position={[-0.25, -0.3, 0.18]}>
            <mesh position={[0, -0.15, 0]}>
              <capsuleGeometry args={[0.08, 0.18, 4, 8]} />
              <meshStandardMaterial color={AMBER} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color={CREAM} roughness={0.8} />
            </mesh>
          </group>

          {/* Back right leg */}
          <group ref={backRightLeg} position={[-0.25, -0.3, -0.18]}>
            <mesh position={[0, -0.15, 0]}>
              <capsuleGeometry args={[0.08, 0.18, 4, 8]} />
              <meshStandardMaterial color={AMBER} roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color={CREAM} roughness={0.8} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
      <planeGeometry args={[12, 4]} />
      <meshStandardMaterial color="#F5E6D0" roughness={1} />
    </mesh>
  );
}

export default function Dog3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-48 md:h-56" />;

  return (
    <div className="h-48 md:h-56 w-full mb-2">
      <Canvas
        camera={{ position: [3, 1.5, 3], fov: 35 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 3]}
          intensity={1}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-3, 2, 0]} intensity={0.3} color="#FFE4B5" />
        <Dog />
        <Ground />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
