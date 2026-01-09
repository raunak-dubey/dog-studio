import styles from '../Project.module.css'

const Title = ({year, titleHeading, imgTitle}) => {
  return (
    <div id='title' img-title={imgTitle} className={styles.title}>
      <small className={styles.year}>{year}</small>
      <h1 className={styles.titleHeading} id='titleHeading'>{titleHeading}</h1>
    </div>
  )
}

export default Title