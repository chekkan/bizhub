let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let organizations = [
    {
        id: getId(),
        name: "NHS"
    },
    {
        id: getId(),
        name: "Hitachi Consulting"
    },
    {
        id: getId(),
        name: "Google"
    }
]

export class OrganizationService {
    getAll() {
        return new Promise(resolve => {
            setTimeout(() => {
                let results = organizations.map(x =>  { return {
                    id:x.id,
                    name:x.name
                }});
                resolve(results);
            }, latency);
        });
    }
}