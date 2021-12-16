

export const formactCurrencyReal = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

export const formactCurrencyEuro = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'EUR'})

export const formactCurrencyIeneAndYuan = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'JPY'})

