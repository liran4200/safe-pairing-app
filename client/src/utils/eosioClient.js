import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

 export default class EosIoUiClient {

  constructor() {
    const url = 'http://localhost:8888';
    const privateKey = ['5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N'];
    const rpc = new JsonRpc(url, {fetch});
    const signatureProvider = new JsSignatureProvider(privateKey);
    this.eos = new Api({ rpc, signatureProvider });
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
     expireSeconds: 30
   });
 }

}
