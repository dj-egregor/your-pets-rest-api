const resizer = require('../utils/resizeImage/resizer')
const Pet = require('../models/pet');
const Base64 = require('js-base64').Base64;


async function verifyPet(owner) {

    const decodedJson = Base64.decode(resizer);
    const arr = JSON.parse(decodedJson);

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    await Pet.create({ ...arr[0], owner });
}

module.exports = verifyPet;
