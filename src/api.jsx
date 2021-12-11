import axios  from "axios";

const ApiWallet = axios.create({
  baseURL: 'https://walletapi-vemser.herokuapp.com'
});

export default ApiWallet;