import Navbar from '../common/Navbar/Navbar'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <Navbar />
      <div className={styles.heroContent}>
        <div className={styles.left}>
          <h1 className={styles.heading}>
            We <br /> Make <br /> Good <br /> Shit{" "}
          </h1>
        </div>
        <div className={styles.bottom}>
          <p className={styles.lead}>
            Dogstudio is a multidisciplinary creative studio at the intersection
            of art, design and technology.
          </p>
          <p>
            Our goal is to deliver amazing experiences that make people talk,
            and build strategic value for brands, tech, entertainment, arts &
            culture.
          </p>
        </div>
        <div className={`${styles.firstLine} ${styles.line}`}></div>
        <div className={`${styles.secondLine} ${styles.line}`}></div>
      </div>
    </section>
  );
};

export default Hero;
