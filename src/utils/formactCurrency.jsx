import { ApiAwesome } from "../api"

export const formactCurrencyReal = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

export const formactCurrencyEuro = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'EUR'})

export const formactCurrencyIene = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'JPY'})

export const formactCurrencyYuan = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'CNY'})

export const currencyConvert = async (value, option) => {
  const { data } = await ApiAwesome.get();


  if(option === 'REAL'){
    console.log('brazuca')
  }else if(option === 'DOLAR') {
    return (Number(data.EURBRL.high) * value)
    
  }else if(option === 'EURO'){
    console.log(data.EURBRL)
  }

  
}