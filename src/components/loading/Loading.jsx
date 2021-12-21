import loadGif from '../../images/Spin-1s-800px.gif'
import styles from './loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loadContainer}>
      <h1>Carregando Conteúdo</h1>
      <img className={styles.loadGif} src={loadGif} alt="Gif Loader" />
    </div>
  )
}

export default Loading;