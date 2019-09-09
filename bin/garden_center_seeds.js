const gardenCenterModel = require('./../models/Gardencenter');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-project', { useNewUrlParser: true });

const gardenCenter = [
	{
		name: 'Truffaut',
		lat: 48.836811,
		long: 2.374103,
		adresse: '85 quai de la gare, 75013 Paris'
	},
	{
		name: 'Marché aux fleurs',
		lat: 48.855655,
		long: 2.347813,
		adresse: '37 place Louis Lépine, 75004 Paris'
	},
	{
		name: 'Casanova',
		lat: 48.858001,
		long: 2.344859,
		adresse: '10 quai de la Mégisserie, 75001 Paris'
	},
	{
		name: 'Mama Petula',
		lat: 48.837414,
		long: 2.334989,
		adresse: '74 avenue Denfert-Rochereau Bâtiment Oratoire, 75014 Paris'
	},
	{
		name: 'Léon & George',
		lat: 48.858469,
		long: 2.391643,
		adresse: '8 rue du repos, 75020 Paris'
	},
	{
		name: 'Le Prince Jardinier',
		lat: 48.856543,
		long: 2.326465,
		adresse: '46 rue du bac, 75007 Paris'
	},
	{
		name: 'René Veyrat',
		lat: 48.875206,
		long: 2.309268,
		adresse: '168 boulevard Haussman, 75008 Paris'
	},
	{
		name: 'Le jardinier de Montmartre',
		lat: 48.894657,
		long: 2.341221,
		adresse: '42 rue du poteau, 75018 Paris'
	},
	{
		name: 'Green Factory',
		lat: 48.872213,
		long: 2.360669,
		adresse: '17 rue Lucien Sampaix, 75010 Paris'
	},
	{
		name: 'Plantes pour tous',
		lat: 48.854798,
		long: 2.379062,
		adresse: '23 rue Basfroi, 75011 Paris'
	},
	{
		name: 'Leroy Merlin 3e',
		lat: 48.861673,
		long: 2.351972,
		adresse: '52 rue Rambuteau, 75003 Paris'
	},
	{
		name: 'Leroy Merlin 4e',
		lat: 48.85684,
		long: 2.359994,
		adresse: '7 Rue des Rosiers, 75004 Paris'
	},
	{
		name: 'Leroy Merlin 8e',
		lat: 48.871216,
		long: 2.324476,
		adresse: '25-27 Place de la Madeleine, 75008 Paris'
	},
	{
		name: 'Leroy Merlin 12e',
		lat: 48.843119,
		long: 2.384574,
		adresse: '139 Avenue Daumesnil, 75012 Paris'
	},
	{
		name: 'Leroy Merlin 17e',
		lat: 48.889411,
		long: 2.31362,
		adresse: '17 Place Françoise Dorin, 75017 Paris'
	},
	{
		name: 'Leroy Merlin 19e',
		lat: 48.898379,
		long: 2.377399,
		adresse: '159 Boulevard Macdonald, 75019 Paris'
	},
	{
		name: 'Castorama 20e',
		lat: 48.848414,
		long: 2.400113,
		adresse: '9-11 Cours de Vincennes, 75020 Paris'
	},
	{
		name: 'Castorama 15e',
		lat: 48.85393,
		long: 2.289869,
		adresse: '11 Boulevard de Grenelle, 75015 Paris'
	},
	{
		name: 'Succulent cactus',
		lat: 48.862492,
		long: 2.364389,
		adresse: '111 Rue de Turenne, 75003 Paris'
	},
	{
		name: 'Au comptoir des fleurs',
		lat: 48.867795,
		long: 2.339535,
		adresse: '14 Rue Vivienne, 75002 Paris'
	}
];

function insertGardenCenter() {
	gardenCenterModel.insertMany(gardenCenter).then((dbRes) => console.log(dbRes)).catch((dbErr) => console.log(dbErr));
}

// run this file ONCE with : node bin/seed.js
insertGardenCenter(); // add all movies
