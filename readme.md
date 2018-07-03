# Meraki Dashboard API Scripts

A collection of NodeJS scripts to interact with the Meraki Dashboard.

Uses the Meraki-Service library.

- Included in /dev/meraki-service
- or repo at https://github.com/dexterlabora/meraki-service

# Pre-requisites

- NodeJS >= v8.1 [Download](https://nodejs.org/en/download/)

# Install

```
git clone https://github.com/dexterlabora/meraki-service-scripts.git
cd meraki-service-scripts
npm install
```

# Usage

Be sure to update the API key, denoted by the `-a` with your own Meraki API key.

## Get Help

```
$ node listNetwork-vlans.js -h

  Usage: listNetwork-vlans [options]

  Options:

    -f, --file <file>      CSV file to write
    -a, --apiKey <apiKey>  The Meraki API Key
    -o, --orgId <orgId>    The Meraki Organization ID
    -h, --help             output usage information
```

## List Organizations

_Print the JSON data and optionally export a CSV file._

`$ node listOrgs.js -a 2f301bccd61b6c642BoGuS76e5eb66ebd170f -f orgs.csv`

```
API Base URL:  https://api.meraki.com/api/v0
Organizations:
 [ { id: 549236, name: 'DevNet Sandbox' } ]
CSV:
 "id","name"
549236,"DevNet Sandbox"

 writing file orgs.csv
The file was saved!
```

## List Networks of an Organization

`$ node listNetworks.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 234567 -f networks.csv`

```
...
CSV:
 "id","organizationId","name","timeZone","tags","type","configTemplateId"
"N_646829496481145308","549236","SM - Corp","America/Los_Angeles"," Sandbox ","systems manager",
"N_646829496481145309","549236","SM - Branch","America/Los_Angeles"," Sandbox ","systems manager",
"N_646829496481145355","549236","MX65 Depot - 1","America/Los_Angeles"," Sandbox ","appliance",
"N_646829496481145356","549236","MX65 Depot - 2","America/Los_Angeles"," Sandbox ","appliance",
"N_646829496481145357","549236","MX65 Depot - 3","America/Los_Angeles"," Sandbox ","appliance",
"N_646829496481145358","549236","MX65 Depot - 4","Etc/Greenwich"," Sandbox ","appliance","L_646829496481093191"
...
```

## List Network VLAN, Subnet and Template Details of an Organization

`$ node listTemplates.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 234567 -f templates.csv`

```
Templates:
 [ { id: 'L_646829496481099061', name: 'testhy' },
  { id: 'L_646829496481099000', name: 'Sandbox Template 2' },
  { id: 'L_646829496481093191', name: 'Sandbox Template' } ]
CSV:
 "id","name"
"L_646829496481099061","testhy"
"L_646829496481099000","Sandbox Template 2"
"L_646829496481093191","Sandbox Template"
```

## List Networks and VLAN information of an Organization

`$ node listVlans-org.js -a 2f301bccd61b6c642BoGuS76e5eb66ebd170f -o 234567 -f nets-vlans.csv`

```
API Base URL:  https://api.meraki.com/api/v0
Networks:  [ { id: 'N_646829496481145308',
    organizationId: '549236',
    name: 'SM - Corp',
    timeZone: 'America/Los_Angeles',
    tags: ' Sandbox ',
    type: 'systems manager' },
 ..
  { id: 'N_646829496481145630',
    organizationId: '549236',
    name: 'DevNet Demo',
    timeZone: 'America/Los_Angeles',
    tags: ' Sandbox ',
    type: 'wireless' } ]

 Getting VLAN information..
VLANS with Network Template Info [ { id: 102,
    networkId: 'N_646829496481145358',
    name: 'Wireless B',
    applianceIp: '10.1.173.65',
    subnet: '10.1.173.64/26',
    fixedIpAssignments: {},
    reservedIpRanges: [],
    dnsNameservers: 'upstream_dns',
    networkName: 'MX65 Depot - 4',
    configTemplateId: 'L_646829496481093191',
    configTemplateName: 'Sandbox Template' },
  { id: 103,
    networkId: 'N_646829496481145358',
    name: 'Point of Sale B',
    applianceIp: '10.129.216.33',
    subnet: '10.129.216.32/28',
    fixedIpAssignments: {},
    reservedIpRanges: [],
    dnsNameservers: 'upstream_dns',
    networkName: 'MX65 Depot - 4',
    configTemplateId: 'L_646829496481093191',
    configTemplateName: 'Sandbox Template' },
    ...
 CSV:
 "id","networkId","name","applianceIp","subnet","fixedIpAssignments","reservedIpRanges","dnsNameservers","networkName","configTemplateId","configTemplateName"
102,"N_646829496481145358","Wireless B","10.1.173.65","10.1.173.64/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
103,"N_646829496481145358","Point of Sale B","10.129.216.33","10.129.216.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
104,"N_646829496481145358","Back Office B","10.200.61.97","10.200.61.96/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
202,"N_646829496481145358","Wireless - A","10.27.178.129","10.27.178.128/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
203,"N_646829496481145358","Point of Sales - A","10.2.26.33","10.2.26.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
204,"N_646829496481145358","Back Office - A","10.1.154.193","10.1.154.192/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481093191","Sandbox Template"
102,"N_646829496481145359","Wireless B","10.17.133.129","10.17.133.128/26","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481093191","Sandbox Template"
...

 writing file nets-vlans.csv
The file was saved!
```

## List Client of an Organization

`$ node listClients-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 234567 -t 864000 -f clients.csv`

```
...
CSV:
 "id","description","mdnsName","dhcpHostname","mac","ip","vlan","switchport","device","usageSent","usageRecv","deviceSerial"
"kb6ff2f","switch-depot-881544dff3af",,"switch-depot-881544dff3af","88:15:44:df:f3:af","192.168.128.3",0,,"{""name"":null,""serial"":""Q2QN-9J8L-SLPD"",""mac"":""e0:55:3d:17:d4:23"",""publicIp"":""64.103.26.57"",""networkId"":""N_646829496481145355"",""status"":""online"",""usingCellularFailover"":false,""wan1Ip"":""10.10.10.106"",""wan2Ip"":null}",9494.504636133699,10619.448924494354,"Q2QN-9J8L-SLPD"
"kbbd940","me0553d1cc880",,"me0553d1cc880","e0:55:3d:1c:c8:80","192.168.128.4",0,,"{""name"":null,""serial"":""Q2QN-9J8L-SLPD"",""mac"":""e0:55:3d:17:d4:23"",""publicIp"":""64.103.26.57"",""networkId"":""N_646829496481145355"",""status"":""online"",""usingCellularFailover"":false,""wan1Ip"":""10.10.10.106"",""wan2Ip"":null}",1370.8901705244366,1874.8223815484453,"Q2QN-9J8L-SLPD"
...
```

## List Devices of an Organization and their status

`$ node listDeviceStatuses.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 234567 -f devices.csv`

```
...
CSV:
 "name","serial","mac","publicIp","networkId","status","usingCellularFailover","wan1Ip","wan2Ip","lanIp"
,"Q2QN-9J8L-SLPD","e0:55:3d:17:d4:23","64.103.26.57","N_646829496481145355","online",false,"10.10.10.106",,
,"Q2QN-F2KR-YVC3","e0:55:3d:70:a6:c5","64.103.26.57","N_646829496481145356","online",false,"10.10.30.104",,
,"Q2QN-WPR6-UJPL","e0:55:3d:17:d5:1a","64.103.26.57","N_646829496481145357","online",false,"10.10.10.108",,
,"Q2QN-WS5Y-DN8E","e0:55:3d:70:ad:86","64.103.26.57","N_646829496481145358","online",false,"10.10.10.109",,
,"Q2QN-WVV9-W4KK","e0:55:3d:17:c6:87","64.103.26.57","N_646829496481145359","online",false,"10.10.10.111",,
,"Q2QN-XPL2-2MPN","e0:55:3d:70:a4:d7","64.103.26.57","N_646829496481145360","online",false,"10.10.10.112",,
,"Q2BV-NZ63-KCSW","e0:55:3d:84:a3:65",,"N_646829496481145361","offline",,,,
,"Q2BV-NJY8-P6KV","e0:55:3d:84:a3:67",,"N_646829496481145361","offline",,,,
...
```

## List SSIDs of an Organization

`$ node listSSIDs-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -o 234567-f ssids-org-sandbox.csv`

```
...
CSV:
1,".meraki-sponsor",true,"Sponsored guest",false,"psk","NAT mode",11,"Dual band operation",0,0,"N_646829496481145383","Hotel WiFi - 1",,"meraki123","wpa","WPA2 only",true,"1.2.3.4/32",,,,,,,,,
2,"excap-test-signon",false,"Password-protected with Meraki RADIUS",false,"open","NAT mode",11,"Dual band operation",0,0,"N_646829496481145383","Hotel WiFi - 1",,,,,true,"1.2.3.4/32
*.internetoflego.com",,,,,,,,,
...
1,"excap-fred",true,"Click-through splash page",false,"8021x-radius","Bridge mode",18,"5 GHz band only",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,"wpa-eap","WPA2 only",true,"127.0.0.1/32","[{""host"":""52.32.144.13"",""port"":1086},{""host"":""52.89.26.115"",""port"":1086}]",false,,false,"Filter-Id",,,false,false
2,"excap-3,"excap-bill",true,"Password-protected with Meraki RADIUS",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
4,"IoL-signon",false,"Click-through splash page",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
5,"IoL-click",false,"Click-through splash page",false,"psk","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191","ikarem","wpa","WPA2 only",true,"127.0.0.1/32",,,,,,,,false,
6,"excap-house",false,"Click-through splash page",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
7,"excap-co",false,"Password-protected with Meraki RADIUS",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
8,"excap-miles",false,"Click-through splash page",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,philzy",true,"Click-through splash page",false,"open","Bridge mode",18,"5 GHz band only",0,0,"L_646829496481099453","miles-life","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,

...
```

## List SSIDs of a Network

`$ node listSSIDs-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -n N_1234567890 -f ssids-org-sandbox.csv`

```
...
CSV:
1,"excap-fred",true,"Click-through splash page",false,"8021x-radius","Bridge mode",18,"5 GHz band only",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,"wpa-eap","WPA2 only",true,"127.0.0.1/32","[{""host"":""52.32.144.13"",""port"":1086},{""host"":""52.89.26.115"",""port"":1086}]",false,,false,"Filter-Id",,,false,false
2,"excap-miles",true,"Click-through splash page",false,"open","Bridge mode",18,"5 GHz band only",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
3,"excap-bob",true,"Password-protected with Meraki RADIUS",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
4,"IoL-signon",false,"Click-through splash page",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
5,"IoL-click",false,"Click-through splash page",false,"psk","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191","ikarem123!","wpa","WPA2 only",true,"127.0.0.1/32",,,,,,,,false,
6,"excap-test",false,"Click-through splash page",false,"open","Bridge mode",1,"Dual band operation",0,0,"L_646829496481099453","sandbox net","L_646829496481093191",,,,true,"127.0.0.1/32",,,,,,,,false,
...
```

# LICENSE

Apache-2.0
