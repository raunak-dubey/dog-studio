import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section id="hero">
      <Navbar />
      <div id="hero-content">
        <div className="left">
          <h1>
            We <br /> Make <br /> Good <br /> Shit{" "}
          </h1>
        </div>
        <div className="bottom">
          <p className="lead">
            Dogstudio is a multidisciplinary creative studio at the intersection
            of art, design and technology.
          </p>
          <p>
            Our goal is to deliver amazing experiences that make people talk,
            and build strategic value for brands, tech, entertainment, arts &
            culture.
          </p>
        </div>
        <div className="first-line line"></div>
        <div className="second-line line"></div>
      </div>
    </section>
  );
};

export default Hero;
