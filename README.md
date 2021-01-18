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

 - ~~nedb-promises~~
 - ~~rxdb~~
 - ~~leveldown~~
 - ~~pouchdb-adapter-leveldb~~
 - ~~trilog~~
 - ~~sql.j~~
 - ~~mssq~~
 - ~~linvodb~~
 - ~~level-j~~
 - lowdb
 - electron-store

### DB faker code 
See [Json Generator](https://next.json-generator.com/). https://next.json-generator.com/
<details><summary>Code</summary>

```
{
  users:[
    {
      'repeat(5, 10)': {
        id: '{{objectId()}}',
        guid: '{{guid()}}',
        first: '{{firstName()}}',
        last: '{{surname()}}',
        name(tags) {
          return `${this.first} ${this.last}`;
        },
        company: '{{company()}}',
        phone: '+48 {{phone()}}',
        mail(tags) {
          return `${this.first}.${this.last}@${this.company}.com`;
        },
        type:'user',
        adress:'{{city()}}, {{street()}} {{floating([1], [234], [0])}}',
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
              type:'stihl',
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
                    type:'rapair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["naprawa tłoka"], ["naprawa gaźnika"],["serwis"] )}}',
                    photos:'{{random(["photo1stihl.jpg"], ["photo2stihl.jpg"], ["photo3stihl.jpg"] )}}',
                    notes:'{{lorem([10])}}',
                  }
                }
              ]
            }
          },
          {
            'repeat(3)': {
              id: '{{objectId()}}',
              guid: '{{guid()}}',
              name: '{{random(["Giant"], ["Fox"], ["Unibike"],["Romet"], )}}',
              type:'bike',
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
                    type:'rapair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["wymiana dętki"], ["naprawa"],["serwis"] )}}',
                    photos:'{{random(["photo1rower.jpg"], ["photo2rower.jpg"], ["photo3rower.jpg"] )}}',
                    notes:'{{lorem([10])}}',
                  }
                }
              ]
            }
          },
          {
            'repeat(3)': {
              id: '{{objectId()}}',
              guid: '{{guid()}}',
              name: '{{random(["Viking 440"], ["Honda 234i"], ["Viking 2324"],["Maruyama 400xl"], )}}',
              type:'bike',
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
                    type:'rapair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["wymiana cylindra"], ["wymiana kółek"],["serwis"] )}}',
                    photos:'{{random(["photo1kosiarka.jpg"], ["photo2kosiarka.jpg"], ["photo3kosiarka.jpg"] )}}',
                    notes:'{{lorem([10])}}',
                  }
                }
              ]
            }
          }
        ],
      }
    }
  ]
}
```

</details>