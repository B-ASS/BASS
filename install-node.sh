#!/bin/bash -e

# resolve links - $0 may be a softlink
if [ -z "$SCRIPT_HOME" ];then
  PRG="$0"
  while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
      PRG="$link"
    else
      PRG=`dirname "$PRG"`/"$link"
    fi
  done

  cd $(dirname $PRG)
  export SCRIPT_HOME=`pwd`
  cd -&>/dev/null
fi

[ -z $SCRIPT_HOME ] && exit 1
echo "HOME: $SCRIPT_HOME"
IP=$1
################################################################################
# install docker 

# pull images
docker pull aergo/node:latest
docker pull aergo/tools:latest
# create BP key
mkdir aergo
docker run -v ~/aergo:/tools --name aergo-tools aergo/tools:latest aergocli keygen aergo-node
BP_KEY=$(cat ~/aergo/aergo-node.id)
# create aergo dir
# create genesis
GENESIS="{
    \"chain_id\":{
        \"magic\":\"test_for_sol1_interns\",
        \"public\":false,
        \"mainnet\":false,
        \"consensus\":\"dpos\"
    },
    \"timestamp\":1553679000000000000,
    \"balance\": {
        \"AmMK3LZiR1oEf66xzXir7mA5SUVVHSinWUYmh5FwueoVmciH3CuJ\": \"499100000000000000000000000\"
    },
    \"bps\": [
        \"$BP_KEY\"
    ]
}"
echo "$GENESIS" > ~/aergo/genesis.json
# create config
CONFIG="# aergo TOML Configuration File (https://github.com/toml-lang/toml)


# base configurations
datadir = \".aergo/data\"
enableprofile = false
profileport = 6060
enablerest = false

[rpc]
netserviceaddr = \"0.0.0.0\"
netserviceport = 7845
nstls = false
nscert = \"\"
nskey = \"\"
nsallowcors = false

[rest]
restport = \"8080\"

[p2p]
# Set address and port to which the inbound peers connect, and don't set loopback address or private network unless used in local network 
netprotocoladdr = \"172.30.1.21\" 
netprotocolport = 7846
npbindaddr = \"0.0.0.0\"
npbindport = 7846
# Set file path of key file
npkey = \"aergo-node.key\"
npaddpeers = [\"/ip4/172.30.1.21/tcp/7846/p2p/$BP_KEY\"]
nphiddenpeers = [\"$BP_KEY\"]
npmaxpeers = 100
nppeerpool = 100
npexposeself = false
npusepolaris = false
nptls = false
npcert = \"\"

[blockchain]
# blockchain configurations
maxblocksize = 1048576
usefastsyncer = true
blockchainplaceholder = false

[mempool]
showmetrics = false
dumpfilepath = \".aergo/mempool.dump\"

[consensus]
enablebp = true"
echo "$CONFIG" > ~/aergo/config.toml

# create genesis block
docker run \
-v ~/aergo:/aergo \
—name aergo-node aergo/node:latest \
aergosvr init --genesis /aergo/genesis.json --home /aergo --config /aergo/config.toml

docker rm -f aergo-node

docker run -d \
-v ~/aergo:/aergo \
-p 7845:7845 -p 7846:7846 -p 6060:6060 \
—name aergo-node —restart=always \
aergo/node:latest \
aergosvr --home /aergo --config /aergo/config.toml



docker run -d --log-driver json-file --log-opt max-size=1000m --log-opt max-file=7 \





