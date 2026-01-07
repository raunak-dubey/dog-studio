import { Canvas } from "@react-three/fiber";
import Dog from "./components/Dog";
import Hero from "./Hero";

const App = () => {
  return (
    <>
      <main>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundImage: "url('/images/background-l.png')",
            backgroundSize: "cover"
          }}
        >
          <Dog />
        </Canvas>
        <Hero />
      </main>
    </>
  );
};

export default App;
