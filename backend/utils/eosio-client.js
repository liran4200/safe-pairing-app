const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); 
const fetch = require('node-fetch');   
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
class EOSIOClient {
  constructor () {
    //const url = process.env.EOSIO_HTTP_URL;
    //const privateKey = [process.env.EOSIO_PRIVATE_KEY];
    const url = 'http://localhost:8888';
    const privateKey = ['5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N'];
    const rpc = new JsonRpc(url, {fetch});
    const signatureProvider = new JsSignatureProvider(privateKey);
    this.eos = new Api({ rpc, signatureProvider ,textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
  }

   async transaction(contractAccount ,actor, action, data){
     console.debug('in transcatopn');
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

module.exports = new EOSIOClient();