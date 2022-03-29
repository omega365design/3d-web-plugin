import ReactDOM from "react-dom";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree, directionalLight } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CameraController() {
  let { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 20000;

    // camera.position

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
      <ambientLight intensity={0.4} />
      <directionalLight intensity={0.5} position={[1, 0.5, 0.75]} castShadow />
      <directionalLight intensity={0.5} position={[-1, -0.5, -0.75]} castShadow />
      {/* <directionalLight position={[-10, -20, -30]} castShadow /> */}
      <primitive object={gltf.scene} position={[0, 0, 0]} scale={0.0005} />
    </Canvas>
  );
}

function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress style={{ color: "#020d2e" }} />
    </Box>
  );
}

ReactDOM.render(
  <Suspense fallback={<CircularIndeterminate />}>
    <RenderComponent />
  </Suspense>,
  document.getElementById("root")
);
