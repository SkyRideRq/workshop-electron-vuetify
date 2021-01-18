# workshop-electron-vuetify

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```
```
yarn electron:serve
```
### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Used

nedb-promises--
rxdb --
leveldown --
pouchdb-adapter-leveldb --
trilogy--
sql.js--
mssql--
linvodb3--
level-js--
lowdb
electron-store
### DB faker code
```
[
  {
    'repeat(5, 10)': {
      id: '{{objectId()}}',
      guid: '{{guid()}}',
      first: '{{firstName()}}',
      last: '{{surname()}}',
      name(tags) {
        return `${this.first} ${this.last}`;
      },
      company: '{{company().toUpperCase()}}',
      phone: '+48 {{phone()}}',
      registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      link(tags) {
        return `${this.guid}`;
      },
      children: [
        {
          'repeat(3)': {
            id: '{{objectId()}}',
            guid: '{{guid()}}',
            name: '{{random(["MS 180"], ["MS 230"] )}}',
            registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
            link(tags,parent) {
              return `${parent.link}/${this.guid}`;
            },
            parentLink(tags,parent) {
              return `${parent.link}`;
            },
            children:[
              {
                'repeat(3)': {
                  id: '{{objectId()}}',
                  guid: '{{guid()}}',
                  registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                  link(tags,parent) {
                    return `${parent.link}/${this.guid}`;
                  },
                   parentLink(tags,parent) {
                    return `${parent.link}`;
                  },
                  name: '{{random(["naprawa tłoka"], ["naprawa gaźnika"],["serwis"] )}}'
                }
              }
            ]
          }
        }
      ],
    }
  }
]
```