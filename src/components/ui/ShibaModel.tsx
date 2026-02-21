"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/Shiba%20Inu.glb";

function Shiba() {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);
  const gltf = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(gltf.animations, innerRef);
  const [phase, setPhase] = useState<"walk" | "idle">("walk");
  const elapsed = useRef(0);

  useEffect(() => {
    const walk = actions["Walk"];
    if (walk) {
      walk.reset().fadeIn(0.3).play();
    }

    const timer = setTimeout(() => {
      setPhase("idle");
      if (walk) walk.fadeOut(0.5);
      const idle = actions["Idle_2_HeadLow"];
      if (idle) {
        idle.reset().fadeIn(0.5).play();
        idle.setLoop(THREE.LoopRepeat, Infinity);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [actions]);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!outerRef.current) return;

    if (phase === "walk") {
      const progress = Math.min(elapsed.current / 2.2, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      outerRef.current.position.x = 6 - eased * 6;
    } else {
      outerRef.current.position.x = THREE.MathUtils.lerp(
        outerRef.current.position.x,
        0,
        0.05
      );
    }
  });

  return (
    <group ref={outerRef} position={[6, 0, 0]} scale={0.6}>
      <group ref={innerRef} rotation={[0, -Math.PI / 5, 0]}>
        <Center>
          <primitive object={gltf.scene} />
        </Center>
      </group>
    </group>
  );
}

export default function ShibaModel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-full h-full min-h-[450px]" />;

  return (
    <div className="w-full h-full min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 3]} intensity={1.5} />
        <pointLight position={[-3, 2, 0]} intensity={0.5} color="#FFE4B5" />
        <Suspense fallback={null}>
          <Shiba />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
