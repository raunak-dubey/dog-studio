import * as THREE from "three";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Dog = () => {
  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger);

  const model = useGLTF("/models/dog.drc.glb");
  useThree(({ camera, gl }) => {
    camera.position.set(0, 0, 2.8);
    camera.fov = 35;
    camera.updateProjectionMatrix();
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap] = useTexture(["/images/dog_normals.jpg"]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/images/branches_diffuse.jpeg",
    "/images/branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [
    mat2,
    mat8,
    mat9,
    mat10,
    mat12,
    mat13,
    mat19,
  ] = useTexture([
    "/matcap/mat-2.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-19.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const material = useRef({
    uMatcap1: { value: mat2 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });
  const matcapTween = useRef(null);

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
    shader.uniforms.uProgress = material.current.uProgress

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
    )
  }

  dogMaterial.onBeforeCompile = onBeforeCompile

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        endTrigger: "#section-3",
        // markers: true,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    tl.to(
      dogModel.current.scene.position,
      {
        z: "-=3",
        y: "+=0.1",
      }
    )
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third"
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=1.2",
          y: "-=0.1",
          z: "+=2.7",
        },
        "third"
      );
  });

  useEffect(() => {
    const matcapMap = {
      tomorrowland: mat19,
      navyPier: mat8,
      msiChicago: mat9,
      phone: mat12,
      kikk: mat10,
      kennedy: mat8,
      opera: mat13,
      default: mat2,
    };

    const transition = (nextMatcap) => {

      if (matcapTween.current) {
        matcapTween.current.kill();
        matcapTween.current = null;
      }

      material.current.uMatcap1.value = nextMatcap;
      material.current.uProgress.value = 1;

      matcapTween.current = gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 0.3,
        onComplete: () => {
          material.current.uMatcap2.value = nextMatcap;
          material.current.uProgress.value = 1.0;
          matcapTween.current = null;
        },
      });
    };

    let titlesEl = null;

    const onOver = (e) => {
      const titleEl = e.target.closest('[img-title]');
      if (!titleEl || !titlesEl.contains(titleEl)) return;

      const key = titleEl.getAttribute("img-title");
      transition(matcapMap[key] || matcapMap.default);
    };

    const onOut = (e) => {
      if (e.relatedTarget && e.relatedTarget.closest('[img-title]')) return;

      transition(matcapMap.default);
    };

    const attach = () => {
      titlesEl = document.querySelector("#titles");
      if (!titlesEl) return false;

      titlesEl.addEventListener("mouseover", onOver);
      titlesEl.addEventListener("mouseout", onOut);
      return true;
    };

    if (!attach()) {
      // Fallback: wait until DOM is ready
      const observer = new MutationObserver(() => {
        if (attach()) observer.disconnect();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }

    return () => {
      if (!titlesEl) return;
      titlesEl.addEventListener("mouseover", onOver);
      titlesEl.addEventListener("mouseout", onOut);
    };
  })

  return (
    <>
      <primitive
        object={model.scene}
        scale={3.5}
        position={[0.55, -2, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </>
  );
};

export default Dog;
