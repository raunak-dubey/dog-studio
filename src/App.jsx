import { Canvas } from "@react-three/fiber";
import Dog from "./components/Dog";
import Hero from "./components/Hero/Hero";
import Project from "./components/Project/Project";
import ImgComponent from "./components/ImgComponent/ImgComponent";

const App = () => {
  return (
    <>
      <main>
        <div className="images" id="images">
          <ImgComponent id="tomorrowland" src="/images/tommorowland.png" alt="tomorrowland" />
          <ImgComponent id="navyPier" src="/images/navy-pier.png" alt="navy-pier" />
          <ImgComponent id="msiChicago" src="/images/msi-chicago.png" alt="msi-chicago" />
          <ImgComponent id="phone" src="/images/phone.png" alt="phone" />
          <ImgComponent id="kikk" src="/images/kikk.png" alt="kikk" />
          <ImgComponent id="kennedy" src="/images/kennedy.png" alt="kennedy" />
          <ImgComponent id="opera" src="/images/opera.png" alt="" />
        </div>
        <Canvas id="canvas" className="canvas"
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <Dog />
        </Canvas>

        <Hero />
        <Project />
        <section id="section-3"></section>
      </main>
    </>
  );
};

export default App;
