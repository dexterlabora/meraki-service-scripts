# Meraki Dashboard API Scripts

A collection of NodeJS scripts to interact with the Meraki Dashboard.

Uses the Meraki-Service library.

- Included in /dev/meraki-service
- or repo at https://github.com/dexterlabora/meraki-service

# Examples

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

_Print the JSON data and optionally export a CSV file._

## List Organizations

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

`$ node listNetworks.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f networks.csv`

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

`$ node listTemplates.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f templates.csv`

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

`$ node listNetwork-vlans.js -a 2f301bccd61b6c642BoGuS76e5eb66ebd170f -o 549236 -f nets-vlans.csv`

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
    networkId: 'N_646829496481111111',
    name: 'Wireless B',
    applianceIp: '10.1.173.65',
    subnet: '10.1.173.64/26',
    fixedIpAssignments: {},
    reservedIpRanges: [],
    dnsNameservers: 'upstream_dns',
    networkName: 'MX65 Depot - 4',
    configTemplateId: 'L_646829496481123456' },
  ...
  { id: 203,
    networkId: 'N_64682949648123456',
    name: 'Point of Sales - A',
    applianceIp: '10.4.236.1',
    subnet: '10.4.236.0/28',
    fixedIpAssignments: {},
    reservedIpRanges: [],
    dnsNameservers: 'upstream_dns',
    networkName: 'MX65 Depot - 6',
    configTemplateId: 'L_646829496481123456' },
  { id: 204,
    networkId: 'N_64682949648123456',
    name: 'Back Office - A',
    applianceIp: '10.3.24.97',
    subnet: '10.3.24.96/27',
    fixedIpAssignments: {},
    reservedIpRanges: [],
    dnsNameservers: 'upstream_dns',
    networkName: 'MX65 Depot - 6',
    configTemplateId: 'L_646829496481123456' } ]
CSV:
 "id","networkId","name","applianceIp","subnet","fixedIpAssignments","reservedIpRanges","dnsNameservers","networkName","configTemplateId"
102,"N_646829496481111111","Wireless B","10.1.173.65","10.1.173.64/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
103,"N_646829496481111111","Point of Sale B","10.129.216.33","10.129.216.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
104,"N_646829496481111111","Back Office B","10.200.61.97","10.200.61.96/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
202,"N_646829496481111111","Wireless - A","10.27.178.129","10.27.178.128/26","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
203,"N_646829496481111111","Point of Sales - A","10.2.26.33","10.2.26.32/28","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
204,"N_646829496481111111","Back Office - A","10.1.154.193","10.1.154.192/27","{}","[]","upstream_dns","MX65 Depot - 4","L_646829496481123456"
102,"N_646829496480000001","Wireless B","10.17.133.129","10.17.133.128/26","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
103,"N_646829496480000001","Point of Sale B","10.128.158.193","10.128.158.192/28","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
104,"N_646829496480000001","Back Office B","10.196.29.97","10.196.29.96/27","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
202,"N_646829496480000001","Wireless - A","10.28.210.1","10.28.210.0/26","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
203,"N_646829496480000001","Point of Sales - A","10.5.24.193","10.5.24.192/28","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
204,"N_646829496480000001","Back Office - A","10.0.149.97","10.0.149.96/27","{}","[]","upstream_dns","MX65 Depot - 5","L_646829496481123456"
102,"N_64682949648123456","Wireless B","10.16.112.193","10.16.112.192/26","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
103,"N_64682949648123456","Point of Sale B","10.134.81.81","10.134.81.80/28","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
104,"N_64682949648123456","Back Office B","10.199.56.225","10.199.56.224/27","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
202,"N_64682949648123456","Wireless - A","10.2.168.193","10.2.168.192/26","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
203,"N_64682949648123456","Point of Sales - A","10.4.236.1","10.4.236.0/28","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"
204,"N_64682949648123456","Back Office - A","10.3.24.97","10.3.24.96/27","{}","[]","upstream_dns","MX65 Depot - 6","L_646829496481123456"

 writing file nets-vlans.csv
The file was saved!
```

## List Client of an Organization

`$ node listClients-org.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -t 864000 -f clients.csv`

```
...
CSV:
 "id","description","mdnsName","dhcpHostname","mac","ip","vlan","switchport","device","usageSent","usageRecv","deviceSerial"
"kb6ff2f","switch-depot-881544dff3af",,"switch-depot-881544dff3af","88:15:44:df:f3:af","192.168.128.3",0,,"{""name"":null,""serial"":""Q2QN-9J8L-SLPD"",""mac"":""e0:55:3d:17:d4:23"",""publicIp"":""64.103.26.57"",""networkId"":""N_646829496481145355"",""status"":""online"",""usingCellularFailover"":false,""wan1Ip"":""10.10.10.106"",""wan2Ip"":null}",9494.504636133699,10619.448924494354,"Q2QN-9J8L-SLPD"
"kbbd940","me0553d1cc880",,"me0553d1cc880","e0:55:3d:1c:c8:80","192.168.128.4",0,,"{""name"":null,""serial"":""Q2QN-9J8L-SLPD"",""mac"":""e0:55:3d:17:d4:23"",""publicIp"":""64.103.26.57"",""networkId"":""N_646829496481145355"",""status"":""online"",""usingCellularFailover"":false,""wan1Ip"":""10.10.10.106"",""wan2Ip"":null}",1370.8901705244366,1874.8223815484453,"Q2QN-9J8L-SLPD"
...
```

## List Devices of an Organization and their status

`$ node listDeviceStatuses.js -a 2f301bccd61b6c6BOGUSf76e5eb66ebd170f -f devices.csv`

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

# LICENSE

Apache-2.0
