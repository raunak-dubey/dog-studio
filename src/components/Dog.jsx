import * as THREE from "three";
import { OrbitControls, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");
  useThree(({ camera, gl }) => {
    camera.position.z = 0.4;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene)

  useEffect(() => {
    actions["Take 001"].play()
  }, [actions])

  const [normalMap, sampleMatCap] = useTexture([
    "/images/dog_normals.jpg",
    "/matcap/mat-2.png"
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/images/branches_diffuse.jpeg",
    "/images/branches_normals.jpeg",
  ]).map((texture) => {
    texture.flipY = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap
  })

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial
    }
  });
  return (
    <>
      <primitive
        object={model.scene}
        position={[0.16, -0.57, 0]}
        rotation={[0, Math.PI / 9, 0]}
      />
      <OrbitControls   />
    </>
  );
};

export default Dog;
