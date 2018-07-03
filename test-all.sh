#!/bin/sh

export API_KEY=enteryourAPIkey
export ORG_ID=enteryourOrgId
export NET_ID=enteryourNetId

node listOrgs.js -a $API_KEY -f $orgs-sandbox.csv
node listNetworks.js -a $API_KEY -o $ORG_ID -f networks-sandbox.csv
node listDeviceStatuses.js -a $API_KEY -o $ORG_ID -f devices-sandbox.csv
node listClients-org.js -a $API_KEY -o $ORG_ID -f clients-sandbox.csv
node listVlans-org.js -a $API_KEY -o $ORG_ID -f vlans-sandbox.csv
node listSSIDs-net.js -a $API_KEY -n $NET_ID -f ssids-net-sandbox.csv
node listSSIDs-org.js -a $API_KEY -o $ORG_ID -f ssids-org-sandbox.csv