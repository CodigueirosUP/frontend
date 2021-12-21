import styles from './CardValues.module.css'
import { formactCurrencyReal } from '../../utils/formactCurrency'

const CardValues = ({title, subTitle, totalValueService}) => {
  return (
    <div className={styles.body}>
      <span>{title}</span>
      <h1>{formactCurrencyReal(totalValueService)}</h1>
      <span>{subTitle}</span>
    </div>
  )
}

export default CardValues;
