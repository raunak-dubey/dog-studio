import Title from "./Title/Title"
import styles from "./Project.module.css"

const Project = () => {
  return (
    <section id="featuredProjects" className={styles.featuredProjects}>
      <div className={styles.titles} id="titles">
        <Title imgTitle="tomorrowland" year="Ongoing" titleHeading=" Tomorrowland" />
        <Title imgTitle="navyPier" year="2018 - Today" titleHeading=" Navy Pier" />
        <Title imgTitle="msiChicago" year="2015 - Today" titleHeading=" MSI Chicago" />
        <Title imgTitle="phone" year="2016" titleHeading=" This Was Louise’s Phone" />
        <Title imgTitle="kikk" year="2012 - Today" titleHeading=" KIKK Festival 2018" />
        <Title imgTitle="kennedy" year="2017" titleHeading=" The Kennedy Center" />
        <Title imgTitle="opera" year="2016 - Ongoing" titleHeading=" Royal Opera Of Wallonia" />
      </div>
    </section>
  )
}

export default Project