import styles from './About.module.css'

const About = () => {
  return (
    <section id="about" className={styles.about}>
        <div className={styles.top}>
            <div className={styles.left}>
                <h2 className={styles.leftHeading}>We're crafting <br /> emotional <br /> experiences aimed <br /> at improving <br /> results</h2>
            </div>
            <div className={styles.bottom}>
                <div className={styles.right}>
                    <p className={styles.para}>Dogstudio is a design & technology firm working globally from our offices based in Belgium and Chicago. Our strong focus on producing high quality & emotional brandings, digital products and experiences became a signature.</p>
                    <p className={styles.para}>We’re passionate about moving people and solving problems for the likes of Microsoft, The Museum of Science And Industry Of Chicago, The Kennedy Center of Washington, Dragone, Quanta Magazine, and many more.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About