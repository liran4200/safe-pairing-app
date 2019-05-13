const {eosAccounts,eosActionsTypes} = require('../utils/constants');
const eosio = require('../utils/eosio-client');

const createNewAccount = async (accName, publicKey) => {
    const data = {
        creator: eosAccounts.SAFE_PAIRING_ACC,
        name: accName,
        owner: {
            threshold: 1,
            keys: [{
            key: publicKey,
            weight: 1
            }],
            accounts: [],
            waits: []
        },
        active: {
            threshold: 1,
            keys: [{
            key: publicKey,
            weight: 1
            }],
            accounts: [],
            waits: []
        }
    }
    await eosio.transaction(
                eosAccounts.EOSIO_ACC,
                eosAccounts.SAFE_PAIRING_ACC,
                eosActionsTypes.NEW_ACCOUNT,
                data
            );
}

const stake = async () => {
    return await eosio.transaction(
        eosAccounts.EOSIO_ACC,
        eosAccounts.SAFE_PAIRING_ACC,
        'delegatebw',
        {
          from: eosAccounts.SAFE_PAIRING_ACC,
          receiver: eosAccounts.SAFE_PAIRING_ACC,
          unstake_net_quantity: '1.0000 SYS',
          unstake_cpu_quantity: '1.0000 SYS',
          transfer: false
        }
    );
}

const getMatching = async () => {
    return await eosio.transaction(
        eosAccounts.SAFE_PAIRING_ACC,
        eosAccounts.SAFE_PAIRING_ACC,
        eosActionsTypes.GET_MATCHING,
        {}
    );
}

module.exports = {
    createNewAccount,
    stake,
    getMatching
}
