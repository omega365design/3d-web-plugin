import ReactDOM from "react-dom";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ChakraProvider, Progress } from "@chakra-ui/react";

function CameraController() {
  let { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 20000;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return null;
}

function RenderComponent() {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, window.modelUrl);
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <Canvas>
      <CameraController />
      <ambientLight />
      <pointLight position={[10, 10, 10]} castShadow />
      <primitive object={gltf.scene} position={[0, 0, 0]} scale={0.0005} />
    </Canvas>
  );
}

ReactDOM.render(
  <ChakraProvider>
    <Suspense fallback={<Progress size="lg" isIndeterminate />}>
      <RenderComponent />
    </Suspense>
  </ChakraProvider>,
  document.getElementById("root")
);
