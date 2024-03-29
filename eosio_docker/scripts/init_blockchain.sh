#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos  -e -p eosio -d /mnt/dev/data \
  --config-dir /opt/eosio/bin/scripts \
  --genesis-json /opt/eosio/bin/scripts/genesis.json \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: spwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n spwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > sp_wallet_password.txt
# Owner key for spwal wallet
cleos wallet import -n spwal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for spwal wallet
cleos wallet import -n spwal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

# * Replace "spwal" by your own wallet name when you start your own project

# create account for spacc with above wallet's public keys
cleos create account eosio spacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9
#cleos create account eosio spacc EOS5bZpTfpZvhKwvbg4Au1EhD9N5UpPoGLYdk3ZBw245q9YuVDYJg EOS5bZpTfpZvhKwvbg4Au1EhD9N5UpPoGLYdk3ZBw245q9YuVDYJg

# * Replace "spacc" by your own account name when you start your own project

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
deploy_contract.sh genematcher spacc spwal $(cat sp_wallet_password.txt)

echo "===skip create user accounts ==="
## script for create data into blockchain
#create_accounts.sh

# * Replace the script with different form of data that you would pushed into the blockchain when you start your own project

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
