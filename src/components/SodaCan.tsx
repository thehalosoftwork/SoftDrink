"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  thumsUp: "/labels/thumsup.png",
  limca: "/labels/limca.png",
  maaza: "/labels/maaza.png",
  campa: "/labels/campa.png",
  appyFizz: "/labels/appyfizz.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

type FlavorKey = keyof typeof flavorTextures;

const DEFAULT_FLAVOR: FlavorKey = "thumsUp";

export type SodaCanProps = {
  flavor?: FlavorKey | string | null;
  scale?: number;
};

export function SodaCan({
  flavor = DEFAULT_FLAVOR,
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

  const labels = useTexture(flavorTextures);

  // Fixes upside down labels
  labels.thumsUp.flipY = false;
  labels.limca.flipY = false;
  labels.maaza.flipY = false;
  labels.campa.flipY = false;
  labels.appyFizz.flipY = false;

  // Fall back to a real brand if Prismic (or a caller) hands us a stale or
  // unknown flavor value — keeps every can branded instead of going blank.
  const safeFlavor: FlavorKey =
    flavor && flavor in flavorTextures
      ? (flavor as FlavorKey)
      : DEFAULT_FLAVOR;
  const label = labels[safeFlavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
