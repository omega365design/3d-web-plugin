import ReactDOM from "react-dom";
import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
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
