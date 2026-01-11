# Interactive 3D Creative Website  
### React · Three.js · GSAP · WebGL

An **interactive, scroll-driven 3D creative website** built using **React Three Fiber and GSAP**, inspired by modern studio-style websites.  
This project is clone of dogstudio.co, focuses on **animation systems, visual storytelling, and DOM–WebGL coordination**, rather than traditional form-based or functional dashboards.

🔗 **Live Demo:** dog-studio-ruddy.vercel.app

---

## ✨ Overview

This website blends **3D graphics and traditional web content** into a single experience:

- A fixed WebGL canvas renders a 3D dog model
- Page sections scroll above the canvas
- Scroll position and hover interactions dynamically affect the 3D scene
- Background imagery transitions smoothly based on scroll and hover state

The goal is to demonstrate **creative frontend engineering**, not just UI layout.

---

## 🎯 Key Features

- **Scroll-driven 3D animation**
  - Model position and rotation controlled via GSAP ScrollTrigger
  - Smooth, continuous transitions tied to page scroll

- **Custom Matcap Material Transitions**
  - Uses `MeshMatcapMaterial`
  - Shader extended via `onBeforeCompile`
  - GPU-driven matcap blending using custom uniforms
  - No material re-creation or React re-renders

- **DOM ↔ WebGL Interaction**
  - Hovering project titles changes the 3D model’s appearance
  - CSS `:has()` used for background image control
  - JavaScript used only where necessary (scroll state)

- **Layered Rendering Architecture**
  - WebGL canvas fixed in the background
  - DOM content scrolls independently above it
  - Images and overlays transition without blocking WebGL

- **Performance-aware Implementation**
  - Single GLTF load
  - Pointer events disabled on canvas
  - Correct texture color-space handling
  - Minimal layout thrashing

---

## 🚀 Tech Stack

- **React**
- **@react-three/fiber**
- **Three.js**
- **@react-three/drei**
- **GSAP**
- **GSAP ScrollTrigger**
- **Modern CSS** (`:has`, fixed layers, z-index control)
- **WebGL / GLSL (via Three.js)**

---

## 📦 Project Structure

```txt
src/
├─ components/
│ ├─ Dog/            # 3D model, materials, shaders, scroll logic
│ ├─ Hero/           # Landing section
│ ├─ Project/        # Featured projects & hover targets
│ ├─ About/          # About section
│ └─ ImgComponent/   # Background image layers
│
├─ styles/
│ ├─ base/           # Reset, fonts, variables
│ └─ global.css      # Global layout & interaction styles
│
├─ App.jsx           # Canvas + DOM composition
└─ main.jsx
