"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import points from "@/data/globe-points.json";
import { heroScroll } from "@/lib/gsap";

const R = 2;
const COLORS = {
  body: "#4252ff",
  dots: "#ffffff",
  sun: "#ffc83d",
  flamingo: "#ff5c9d",
  mint: "#2fe0a5",
};

function toVec(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// Student routes: home cities to study destinations.
const routes: { from: [number, number]; to: [number, number]; color: string }[] = [
  { from: [17.39, 78.49], to: [51.51, -0.13], color: COLORS.sun }, // Hyderabad → London
  { from: [17.39, 78.49], to: [-33.87, 151.21], color: COLORS.mint }, // Hyderabad → Sydney
  { from: [6.52, 3.38], to: [43.65, -79.38], color: COLORS.flamingo }, // Lagos → Toronto
  { from: [21.03, 105.85], to: [52.52, 13.4], color: COLORS.sun }, // Hanoi → Berlin
  { from: [28.61, 77.21], to: [53.35, -6.26], color: COLORS.flamingo }, // Delhi → Dublin
  { from: [24.86, 67.0], to: [42.36, -71.06], color: COLORS.mint }, // Karachi → Boston
  { from: [23.81, 90.41], to: [-36.85, 174.76], color: COLORS.sun }, // Dhaka → Auckland
];

function LandDots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = points as [number, number][];

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    data.forEach(([lat, lon], i) => {
      const p = toVec(lat, lon, R + 0.006);
      dummy.position.copy(p);
      dummy.lookAt(p.clone().multiplyScalar(2));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [data]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, data.length]}>
      <circleGeometry args={[0.03, 10]} />
      <meshBasicMaterial color={COLORS.dots} />
    </instancedMesh>
  );
}

function Route({
  from,
  to,
  color,
  speed,
  offset,
  animate,
}: {
  from: [number, number];
  to: [number, number];
  color: string;
  speed: number;
  offset: number;
  animate: boolean;
}) {
  const { curve, tube } = useMemo(() => {
    const a = toVec(...from);
    const b = toVec(...to);
    const lift = R + a.distanceTo(b) * 0.55;
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(lift);
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, tube: new THREE.TubeGeometry(c, 64, 0.014, 8, false) };
  }, [from, to]);

  const plane = useRef<THREE.Mesh>(null);
  const start = useMemo(() => toVec(...from, R + 0.02), [from]);
  const end = useMemo(() => toVec(...to, R + 0.02), [to]);

  useFrame(({ clock }) => {
    if (!plane.current) return;
    const t = animate ? (clock.elapsedTime * speed + offset) % 1 : 0.55;
    plane.current.position.copy(curve.getPoint(t));
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={plane}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={start}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Globe({ animate }: { animate: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const lift = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const p = heroScroll.progress;
    if (spin.current) {
      const idle = animate ? clock.elapsedTime * 0.06 : 0;
      spin.current.rotation.y = 4.0 + idle + p * Math.PI * 0.9;
    }
    if (lift.current) {
      lift.current.position.y = p * 1.4;
      lift.current.scale.setScalar(1 - p * 0.15);
    }
  });

  return (
    <group ref={lift}>
      <group rotation={[0.38, 0, -0.12]}>
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[R, 64, 64]} />
            <meshStandardMaterial color={COLORS.body} roughness={0.85} />
          </mesh>
          <LandDots />
          {routes.map((r, i) => (
            <Route key={i} {...r} speed={0.12 + (i % 3) * 0.03} offset={i * 0.17} animate={animate} />
          ))}
        </group>
      </group>
    </group>
  );
}

function Toys({ animate }: { animate: boolean }) {
  const speed = animate ? 1.4 : 0;
  return (
    <>
      <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[1.85, 1.75, 0.9]} rotation={[0.9, 0.3, 0]}>
          <torusGeometry args={[0.38, 0.16, 24, 48]} />
          <meshStandardMaterial color={COLORS.sun} roughness={0.4} />
        </mesh>
      </Float>
      <Float speed={speed * 0.9} rotationIntensity={1.4} floatIntensity={1.2}>
        <mesh position={[-2.1, -1.55, 1]} rotation={[0.3, 0.4, 0.6]}>
          <coneGeometry args={[0.36, 0.7, 32]} />
          <meshStandardMaterial color={COLORS.flamingo} roughness={0.45} />
        </mesh>
      </Float>
      <Float speed={speed * 1.1} rotationIntensity={1.6} floatIntensity={1}>
        <mesh position={[1.75, -1.85, 1.1]} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color={COLORS.mint} roughness={0.5} flatShading />
        </mesh>
      </Float>
      <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={1.6}>
        <mesh position={[-1.95, 1.85, 0.4]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </Float>
    </>
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

export default function GlobeScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  const animate = !reduced;

  // Stop rendering when the hero is off screen, to save battery.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8.1], fov: 42 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[4, 5, 6]} intensity={2.2} />
        <directionalLight position={[-6, -2, -3]} intensity={0.8} color={COLORS.flamingo} />
        <Globe animate={animate} />
        <Toys animate={animate} />
      </Canvas>
    </div>
  );
}
