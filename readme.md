# Meraki Dashboard API Scripts

A collection of NodeJS scripts to interact with the Meraki Dashboard.

It uses the Meraki-Service library.

- Included in /dev/meraki-service
- or repo at https://github.com/dexterlabora/meraki-service

# Examples

**List Organizations**

```
$ node listOrgs.js -a 2f301bccd61b6c642BoGuS76e5eb66ebd170f -f org-list.csv
```

**List Networks and VLAN information**

```
$ node listNetwork-vlans.js -a 2f301bccd61b6c642BoGuS76e5eb66ebd170f -o 549236 -f nets-vlans.csv
```

** Get Help **

```
$ node listNetwork-vlans.js -h

  Usage: listNetwork-vlans [options]

  Options:

    -f, --file <file>      CSV file to write
    -a, --apiKey <apiKey>  The Meraki API Key
    -o, --orgId <orgId>    The Meraki Organization ID
    -h, --help             output usage information
```

# LICENSE

Apache-2.0
