import axios  from "axios";

const ApiWallet = axios.create({
  baseURL: 'https://walletapi-vemser.herokuapp.com'
});

const ApiAwesome = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'
})

const ApiAwesomeMedia = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/daily/USD-BRL/30'
})


export  {ApiWallet, ApiAwesome, ApiAwesomeMedia};