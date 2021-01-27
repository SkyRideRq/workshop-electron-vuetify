# workshop db app

Vue 2 + Vuetify + Electron

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

<details><summary>Code Users</summary>

```
{
  users:[
    {
      'repeat(10)': {
        id: '{{objectId()}}',
        guid: '{{guid()}}',
        first: '{{firstName()}}',
        last: '{{surname()}}',
        name(tags) {
          return `${this.last} ${this.first}`;
        },
        company: '{{company()}}',
        phone: '+48 {{phone()}}',
        mail(tags) {
          return `${this.first}.${this.last}@${this.company}.com`.toLowerCase();
        },
        type:'user',
        adress:'{{city()}}, {{street()}} {{floating([1], [234], [0])}}',
        registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
        link(tags) {
          return `${this.guid}`;
        },
        children: [
          {
            'repeat(1, 3)': {
              id: '{{objectId()}}',
              guid: '{{guid()}}',
              name: '{{random(["MS 180"], ["MS 230"] )}}',
              type:'stihl',
              serialNumber:'{{floating([100000000], [999999999], [0])}}',
              registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
              link(tags,parent) {
                return `${parent.link}/${this.guid}`;
              },
              parentLink(tags,parent) {
                return `${parent.link}`;
              },
              children:[
                {
                  'repeat(1, 4)': {
                    id: '{{objectId()}}',
                    guid: '{{guid()}}',
                    type:'repair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    returned:'{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    partCost:'{{floating([1], [1234], [0])}}',
                    workCost:'{{floating([1], [1234], [0])}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["naprawa tłoka"], ["naprawa gaźnika"],["serwis"] )}}',
                    photos:[{
                      'repeat(0, 3)': '{{random(["photo1stihl.jpg"], ["photo2stihl.jpg"], ["photo3stihl.jpg"] )}},'
                    }],
                    shortNotes:'{{lorem([1]).toLowerCase()}}',
                    notes:'{{lorem([10]).toLowerCase()}}',
                    partList:[

                    ]
                  }
                }
              ]
            }
          },
          {
            'repeat(1, 3)': {
              id: '{{objectId()}}',
              guid: '{{guid()}}',
              name: '{{random(["giant"], ["fox"], ["unibike"],["romet"], )}}',
              type:'bike',
              serialNumber:'{{floating([100000000], [999999999], [0])}}',
              registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',

              link(tags,parent) {
                return `${parent.link}/${this.guid}`;
              },
              parentLink(tags,parent) {
                return `${parent.link}`;
              },
              children:[
                {
                  'repeat(1, 5)': {
                    id: '{{objectId()}}',
                    guid: '{{guid()}}',
                    type:'repair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    returned:'{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    partCost:'{{floating([1], [1234], [0])}}',
                    workCost:'{{floating([1], [1234], [0])}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["wymiana dętki"], ["naprawa"],["serwis"] )}}',
                    photos:[{
                      'repeat(0, 3)': '{{random(["photo1rower.jpg"], ["photo2rower.jpg"], ["photo3rower.jpg"] )}},'
                    }],
                    shortNotes:'{{lorem([1]).toLowerCase()}}',
                    notes:'{{lorem([10]).toLowerCase()}}',
                    partList:[

                    ]
                  }
                }
              ]
            }
          },
          {
            'repeat(1, 3)': {
              id: '{{objectId()}}',
              guid: '{{guid()}}',
              name: '{{random(["viking 440"], ["honda 234i"], ["viking 2324"],["maruyama 400xl"], )}}',
              type:'mower',
              serialNumber:'{{floating([100000000], [999999999], [0])}}',
              registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
              link(tags,parent) {
                return `${parent.link}/${this.guid}`;
              },
              parentLink(tags,parent) {
                return `${parent.link}`;
              },
              children:[
                {
                  'repeat(1, 6)': {
                    id: '{{objectId()}}',
                    guid: '{{guid()}}',
                    type:'repair',
                    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    returned:'{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
                    partCost:'{{floating([1], [1234], [0])}}',
                    workCost:'{{floating([1], [1234], [0])}}',
                    link(tags,parent) {
                      return `${parent.link}/${this.guid}`;
                    },
                     parentLink(tags,parent) {
                      return `${parent.link}`;
                    },
                    name: '{{random(["wymiana cylindra"], ["wymiana kółek"],["serwis"] )}}',
                    photos:[{
                      'repeat(0, 3)': '{{random(["photo2kosiarka.jpg"], ["photo1kosiarka.jpg"], ["photo3kosiarka.jpg"] )}},'
                    }],
                    shortNotes:'{{lorem([1]).toLowerCase()}}',
                    notes:'{{lorem([10]).toLowerCase()}}',
                    partList:[]
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
<details><summary>Code Parts</summary>

```
[
  {
    'repeat(10)': {
      id: '{{objectId()}}',
      guid: '{{guid()}}',
      name:'{{random(["tłok"], ["uszczelka"], ["karabin"], ["sznur"], ["łopata"], ["membrana"], ["widelec"], ["koło"], ["iglica"], ["klucz"], ["zapadka"], ["nakrętka"], ["taśma izolacyjna"],["cylinder"] )}}',
      price:'{{floating([1], [1234], [0])}}',
      productId:'{{floating([999999], [999999999], [0])}}'
    }
  }
]
```

</details>
