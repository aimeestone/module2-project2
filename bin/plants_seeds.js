const plantsModel = require('./../models/Plant');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-project', { useNewUrlParser: true });

const plants = [
	{
		name: 'Ficus',
		descriptif: 'Large shrub whose strong stems, which change a milky sap, ramify as they age.',
		advice:
			'Young rubbers tend to grow straight on a single rod. Preferably buy a large potty with several topics. Rubber is naturally easy and prosperous, as long as its roots are not drowned. After watering, be sure to empty the saucer containing excess water. Repot the plant once a year in February-March for the first 3 years.',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'softened', 'direct' ],
			humidity: [ 'normal' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'green plant' ]
		},
		avatar: '../public/images/ficus-2.jpg'
	},
	{
		name: 'Cactus',
		descriptif:
			'Spherical cactus up to 60 cm in diameter, even 1 m. Notable spurts, sulfur yellow. Blossoming brown and yellow on plants older than 20 years.',
		advice: 'Water once a fortnight in the summer. Keep dry in winter',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'direct' ],
			humidity: [ 'normal', 'quite' ],
			animals: [ 'pet friendly' ],
			type_of_plant: [ 'green plant' ]
		},
		avatar: '../public/images/cactus.jpg'
	},
	{
		name: 'Aloe Vera',
		descriptif:
			'Aloe vera is one of these species, native to Arabia and introduced by the Spanish in the New World where it became naturalized. This plant, without stem or almost, is decorative by its beautiful green leaves glaucous, of 40 cm long, in rosette and edged with teeth. Inflorescence 70 cm high, yellow, at the end of winter.',
		advice: 'To grow in pot. To return inside in winter if it is installed in the garden.',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'direct' ],
			humidity: [ 'normal', 'quite' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'green plant' ]
		},
		avatar: '../public/images/aloe-vera-2.jpg'
	},
	{
		name: 'Guzmaniaplant',
		descriptif:
			'Species and varieties: The genus Vriesa has 250 species. Vriesa splendens, with transverse striped leaves, bears a large bright red flat spike. This is the most commonly proposed. The horticulturists have produced many hybrids, less delicate to cultivate than the botanical species. Some have more or less branched, muticolous ears. V hierohlyphica, with pale green leaves transversely striped, is one of the most beautiful species.',
		advice:
			'Especially no drafts. Repotting: Only for transplanted seedlings in the spring if they are too cramped.',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'low to none' ],
			humidity: [ 'normal', 'quite' ],
			animals: [ 'pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/guzmania-2.jpg'
	},
	{
		name: 'Moon flower',
		descriptif: 'Persistent rhizomatous perennial, very bushy.',
		advice: 'Keep the spathiphyllum away from fresh drafts, which cause the tips of the leaves to brown and dry.',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'low to none', 'softened' ],
			humidity: [ 'quite' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/fleur-de-lune.jpg'
	},
	{
		name: 'Mountain palm',
		descriptif: 'Palm forming a tuft.',
		advice:
			'Place the pot on a bed of damp pebbles and spray the leaves daily, emphasizing the bottom. Longevity: from 3 to 8 years in the house.',
		environment: {
			outside: [ 'indoor' ],
			lighting: [ 'softened' ],
			humidity: [ 'normal', 'quite' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/palmier-des-montagnes-2.jpg'
	},
	{
		name: 'Clematis',
		descriptif:
			'Clematis is a climbing plant measuring 3 m in height and 2 m wide. Deciduous foliage, green. Dark purple red flowers, from June to September.',
		advice:
			'Place the pot on a bed of damp pebbles and spray the leaves daily, emphasizing the bottom. Longevity: from 3 to 8 years in the house.',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'softened', 'direct' ],
			humidity: [ 'normal' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/clematis.jpg'
	},
	{
		name: 'Thujas',
		descriptif:
			'Pretty coloring of the foliage. Easily lends itself to size. Suitable for small gardens. Resistance to cold and atmospheric pollution.',
		advice:
			'Thujas are trees traditionally used to form monospecific hedges, veritable green screens. To avoid attacks of diseases and pests (especially red spiders) that this lack of diversity promotes, mix thujas with other species. Better yet: install them in isolation, in alignment and stop cutting them to let them become the tall trees they are in reality.',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'low to none', 'softened' ],
			humidity: [ 'normal' ],
			animals: [ 'pet friendly' ],
			type_of_plant: [ 'green plant' ]
		},
		avatar: '../public/images/thuya.jpg'
	},
	{
		name: 'Lilac',
		descriptif:
			'Tall erect shrub, upright, flared. The beautiful violet flowers of the common lilac are very fragrant and grouped in panicles erected. Flowering occurs in May or early June.',
		advice:
			'Marry this beautiful variety with other flowering shrubs. For better preservation in vases, remove the foliage.',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'softened', 'direct' ],
			humidity: [ 'normal' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/lilas-2.jpg'
	},
	{
		name: 'Lavender',
		descriptif:
			'Shrub-shaped shrub with rapid growth. Persistent foliage, greyish then green. Purple flowers, fragrant, in June-July. Recommended for growing in tanks.',
		advice:
			'You can make a beautiful border with this lavender with violet bloom, very fragrant, in June-July, and almost without watering',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'direct' ],
			humidity: [ 'dry' ],
			animals: [ 'pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/lavender-2.jpg'
	},
	{
		name: 'Hydrangea',
		descriptif:
			'Hydrangea macrophylla is divided into two groups: those of round, sterile flowers; "Lace Caps" or "Lace beanies" with flat corymbs, composed of tiny fertile flowers, surrounded by large, sterile flowers, which will be reserved for the decoration of the garden in a shady massif.',
		advice: 'Take care not to directly water the foliage and the flowers to have a beautiful evolution of color.',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'low to none', 'softened' ],
			humidity: [ 'normal' ],
			animals: [ 'not pet friendly' ],
			type_of_plant: [ 'plant with flowers' ]
		},
		avatar: '../public/images/hortensia.jpg'
	},
	{
		name: 'Astilbe',
		descriptif:
			'Hardy and extremely hardy perennial. Plantation in ordinary soil, or heavy, humus and rich, rather cool or wet, although this plant is resistant to transient drought.',
		advice:
			'In heavy soil, adding compost or compost is beneficial. Care: Water if necessary, in prolonged dry weather. Delete the defused stems. Take advantage of spring weeding to bring organic fertilizer.',
		environment: {
			outside: [ 'outdoor' ],
			lighting: [ 'low to none', 'softened' ],
			humidity: [ 'quite' ],
			animals: [ 'pet friendly' ],
			type_of_plant: [ 'green plant' ]
		},
		avatar: 'images/astilbe.jpg'
	}
];

function insertPlants() {
	plantsModel.insertMany(plants).then((dbRes) => console.log(dbRes)).catch((dbErr) => console.log(dbErr));
}

// run this file ONCE with : node bin/seed.js
insertPlants(); // add all movies
