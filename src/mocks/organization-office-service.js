let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let offices = [
    {
        id: getId(),
        address_line_1: "2 Simple Street",
        address_line_2: "Hogwards",
        town_or_city: "Fake Town",
        country: "United Kingdom",
        postcode: "BL2 2JW",
        organization: {
            id: 1,
            name: "NHS"
        }
    },
    {
        id: getId(),
        address_line_1: "10 Downing Street",
        address_line_2: "Hogwards",
        town_or_city: "London",
        country: "United Kingdom",
        postcode: "NW11 2AP",
        organization: {
            id: 1,
            name: "NHS"
        }
    },
    {
        id: getId(),
        address_line_1: "2 More London",
        address_line_2: "Riverside",
        town_or_city: "London",
        county: "Greater London",
        country: "United Kingdom",
        postcode: "SE11 2AP",
        organization: {
            id: 2,
            name: "Hitachi Consulting"
        }
    },
    {
        id: getId(),
        address_line_1: "1-13 St Giles High St",
        town_or_city: "London",
        country: "United Kingdom",
        postcode: "WC2H 8AG",
        organization: {
            id: 3,
            name: "Google"
        }
    }
]

export class MockedOrganizationOfficeService {
    getByOrganizationId(orgId) {
        return new Promise(resolve => {
            setTimeout(() => {
                let results = offices.filter(x => x.organization.id == orgId).map(x => { return {
                    id: x.id,
                    addressLine1: x.address_line_1,
                    addressLine2: x.addressLine2,
                    townOrCity: x.town_or_city,
                    country: x.country,
                    postcode: x.postcode,
                    organization: {
                        id: x.organization.id,
                        name: x.organization.name
                    }
                }});
                resolve(results);
            }, latency);
        });
    }

    getById(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                let found = offices.filter(x => x.id == id)[0];
                resolve({
                    id: found.id,
                    addressLine1: found.address_line_1,
                    addressLine2: found.addressLine2,
                    townOrCity: found.town_or_city,
                    country: found.country,
                    postcode: found.postcode,
                    organization: {
                        id: found.organization.id,
                        name: found.organization.name
                    }
                });
            }, latency)
        });
    }
}
