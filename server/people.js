var faker = require('faker-zh-cn');

function getData() {
    var arr = [];

    for (let i = 1; i <= 30; i++) {
        arr.push({
            id: i,
            name: faker.Name.findName(),
            email: faker.Internet.email(),
            city: faker.Address.city()
        })
    }


    return {peopleList: arr};
}

module.exports = getData;