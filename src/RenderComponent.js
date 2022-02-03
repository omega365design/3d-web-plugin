import React, { Suspense, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Box(props) {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "./test.gltf");
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
      {/* <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh> */}
    </Suspense>
  );
}

export default Box;
