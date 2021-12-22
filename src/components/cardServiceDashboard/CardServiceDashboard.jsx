import styles from './CardServiceDashboard.module.css'
import { formactCurrencyReal } from '../../utils/formactCurrency';
import { useState, useEffect } from 'react';
import moment from 'moment';

const CardServiceDashboard = ({ service }) => {

  const [valueMonth, setValueMonth] =  useState();

  const teste = () => {
    if(service.periocidade === 'MENSAL'){
      setValueMonth(service.valor / 1);
    }else if(service.periocidade === 'TRIMESTRAL'){
      setValueMonth(service.valor / 3);
    }else if(service.periocidade === 'SEMESTRAL'){
      setValueMonth(service.valor / 6);
    }else {
      setValueMonth(service.valor / 12);
    }
  }

  useEffect(() => {
   if(service){
    teste();
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={service.dataDeletado !== null ? styles.containerExpired :  styles.container}>
      <strong>{service.nome}</strong>
      <p><strong>Valor:</strong> {formactCurrencyReal(service.valor)}</p>
      <p><strong>Valor Mensal:</strong> {formactCurrencyReal(valueMonth)}</p>
      <p><strong>Data de contrato:</strong> {moment(service.data).format('DD/MM/YYYY')}</p>
      {service.gerente && <p><strong>Ger. :</strong>  {service.gerente.nomeCompleto}</p>}
    </div>
  )
}

export default CardServiceDashboard;
