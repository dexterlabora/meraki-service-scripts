#!/bin/sh

# Meraki Sandbox API Credentials
export API_KEY=2f301bccd61b6c642d250cd3f76e5eb66ebd170f
export ORG_ID=549236
export NET_ID=N_646829496481145383

node listOrgs.js -a $API_KEY -f demo-orgs.csv
node listNetworks.js -a $API_KEY -o $ORG_ID -f demo-networks.csv
node listDeviceStatuses.js -a $API_KEY -o $ORG_ID -f demo-devices.csv
node listClients-org.js -a $API_KEY -o $ORG_ID -f demo-clients-org.csv
node listVlans-org.js -a $API_KEY -o $ORG_ID -f demo-vlans-org.csv
node listSSIDs-net.js -a $API_KEY -n $NET_ID -f demo-ssids-net.csv
node listSSIDs-org.js -a $API_KEY -o $ORG_ID -f demo-ssids-org.csv