

export const formactCurrencyReal = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

export const formactCurrencyEuro = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'EUR'})

export const formactCurrencyIene = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'JPY'})

export const formactCurrencyYuan = (valor = 0) => valor.toLocaleString('pt-br',{style: 'currency', currency: 'CNY'})

