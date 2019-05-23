import { Api, JsonRpc, RpcError } from 'eosjs'; // https://github.com/EOSIO/eosjs
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';

 export default class EosIoUiClient {

  constructor(pr) {
    const url = `http://${process.env.REACT_APP_DOMAIN}:8888`;
    const rpc = new JsonRpc(url);
    const signatureProvider = new JsSignatureProvider([pr]);
    this.eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
  }

  async transaction(contractAccount ,actor, action, data) {
    console.log('in transcatopn');
   return this.eos.transact({
     actions: [
       {
         account: contractAccount,
         name: action,
         authorization: [
           {
             actor,
             permission: 'active'
           }
         ],
         data: data
       }
     ]
   }, {
     blocksBehind: 3,
     expireSeconds: 300
   });
 }

}
