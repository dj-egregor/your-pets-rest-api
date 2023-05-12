const express = require('express');

const { pets: ctrl } = require('../../controllers');
const validation = require('../../middlewares/validation');

const authenticate = require('../../middlewares/authenticate');
const addPetSchema = require('../../schemas/pets');

const router = express();

router.get('/', authenticate, ctrl.getUserPets);

router.post('/', authenticate, validation.validate(addPetSchema), ctrl.addPet);

router.delete('/:petId', authenticate, ctrl.removePet);

module.exports = router;
