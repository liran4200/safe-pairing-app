

# Overview
SafePairing demonstrates the eosio platform running a blockchain as a local single node test net with a DApp, SafePairing. SafePairing allows users to compare DNA sequences between 2 users.
This guide uses scripts, containing relevant commands, which will show how to install, build and run SafePairing, and by doing so will demonstrate:

- Downloading and running eosio in docker;
- Managing your docker container;
- Setting up and running a local single node testnet;
- Setting up wallets, keys, and accounts;
- Writing and deploying a smart contract;
- Implementing a web based UI using React;
- Connecting the UI to the blockchain using eosjs;

**Full doc**: https://drive.google.com/open?id=1brzmopIvHktyszaHMNX9uDVUvDdzsQ7K1WZLfuhdxdE

# Prerequisites
Make sure Docker and Node.js are installed

* Install Docker: https://docs.docker.com/docker-for-mac/install/
* Install Node.js: https://nodejs.org/en/

The DApp and eosio will occupy the ports 3000, 3001, 8888 and 9876. Make sure nothing else is already running on these ports.

Clone the repository:
```sh
git clone https://github.com/liran4200/safe-pairing-app.git
```

The following guide assumes you are using macOS.
# Quick start - Run the DApp

In this section we provide a single command script to run all the commands needed to start both the blockchain and UI. For more detail on each component see the `Detailed guide` below.

**To start**
```sh
./quick_start.sh
```

The above command will execute the following in sequence:

1. `first_time_setup.sh`
2. `start_eosio_docker.sh`
3. `start_frontend.sh`
4. `start_backend.sh`

**To stop**, press `ctrl+c` on your keyboard, and execute:
```sh
docker stop eosio_safepairing_container
```

# Detailed guide

In this section we will describe in detail each script used to run the SafePairing environment in details.

## Initial setup

```sh
./first_time_setup.sh
```

Executing the above shell script verifies that docker and node.js are installed. It then builds `eosio-safepairing` docker image if it has never been built before (which contains a full version of the eosio blockchain), removes any previous instances of this docker container and installs node packages for the frontend react app.

## Initialise and start blockchain and DApp

After the initialisation, three terminal windows are required, both opened in the repository directory

- The **first terminal window** is for **blockchain** process.
- The **second terminal window** is for **frontend** react app.
- The **third terminal window** is for **backend** node app.


**running the blockchain**

For the first (blockchain) terminal window, running
```sh
./start_eosio_docker.sh
```
will:

- Start the eosio blockchain
- Create smart contract owner account,
- Deploy smart contract

The log of blockchain will be displayed on your screen. eosio is now running and starts producing blocks.

**running the DApp**

For the second (frontend) terminal window, running
```sh
./start_frontend.sh
```
will open a browser session connecting to http://localhost:3000/ showing the react app. You can try to add or remove notes using one of the pre-created accounts with its key on the website. This react app will interact with the smart contract, performing transactions, which are written to the blockchain, which stores note data in the multi index table of the smart contract running on your local nodeos.

## Stopping blockchain or DApp

**stopping the blockchain**

In the first (blockchain) terminal window, press `ctrl+c` on your keyboard, the log will stop printing. And then execute:
```sh
docker stop eosio_safepairing_container
```

This action will take a few seconds. The blockchain will be stopped.

**stopping the DApp**

In the second (frontend) terminal window, press `ctrl+c` on your keyboard. The frontend react app will be stopped.

## Restarting blockchain or DApp

**restarting the blockchain**

In the first (blockchain) terminal window, execute this command:
```sh
./start_eosio_docker.sh
```

The blockchain will be resumed automatically and the log will be outputted to the terminal.

**restarting the DApp**

In the second (frontend) terminal window, you can restart the frontend react app by executing:
```sh
./start_frontend.sh
```

## Reset blockchain data

First, you need to stop the blockchain (as above) and then execute:
```sh
./first_time_setup.sh
```

This removes all data on the blockchain, including accounts, deployed smart contracts, etc... The block count will be reset when you start the blockchain again.

## Docker usage

Docker is used to wrap the eosio software inside and run a container (instance) from an image (`eosio-safepairing`). To work with the blockchain directly, by running the scripts or using a cleos command line, you need to go into the container bash.

Go into container bash:
```sh
docker exec -it eosio_safepairing_container bash
```
We have already set the container working directory to `/opt/eosio/bin/`, you could run cleos command in this directory directly. For documentation of cleos: https://developers.eos.io/eosio-nodeos/docs/cleos-overview

You can also look at the `init_blockchain.sh` or `deploy_contract.sh` scripts for examples of cleos command lines.

To exit from inside the container bash:
```sh
exit
```

## Docker commands

If you are more familiar with docker, you could use the docker commands below to have better control with the whole environment. Below are the explanations of each of the commands:

**Execute below command in `/eosio_docker`:**

Run container from `eosio-safepairing` image by mounting contracts / scripts to the container with running the init_blockchain.sh script as the process.
The init_blockchain.sh script run the local node of the blockchain and initializes wallets / contract / data.
```sh
docker run --rm --name eosio_safepairing_container \
-p 8888:8888 -p 9876:9876 \
--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \
-w "/opt/eosio/bin/" eosio-safepairing:eos1.7.0-cdt1.5.0 /bin/bash -c "./scripts/init_blockchain.sh"
```

Output and follow docker console logs:
```sh
docker logs eosio_safepairing_container --follow
```

Remove the container (will remove all wallets / contracts / data), useful if you want to re-init the whole DApp.
```sh
docker rm -f eosio_safepairing_container
```

Stop the container (see below troubleshoot section to see how to pause and continue the blockchain):
```sh
docker stop eosio_safepairing_container
```
