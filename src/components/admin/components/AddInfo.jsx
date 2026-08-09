import PropTypes from 'prop-types';
import {
	Grid,
	NativeSelect,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

export default function AddInfo({ formData, setFormData }) {
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	return (
		<Grid container spacing={3} alignItems='center'>
			<Grid item xs={12} sm={4}>
				<NativeSelect
					defaultValue='Type'
					required
					fullWidth
					inputProps={{
						name: 'type',
						id: 'type',
					}}
					value={formData.type}
					onChange={handleChange}
				>
					<option disabled>Type</option>
					<option value={'Cat'}>Cat</option>
					<option value={'Dog'}>Dog</option>
				</NativeSelect>
			</Grid>
			<Grid item xs={12} sm={4}>
				<NativeSelect
					defaultValue='Breed'
					required
					fullWidth
					inputProps={{
						name: 'breed',
						id: 'breed',
					}}
					value={formData.breed}
					onChange={handleChange}
				>
					<option disabled>Breed</option>
					{formData.type === '' ? (
						<option disabled>Please select type</option>
					) : formData.type === 'Cat' ? (
						catBreeds.map((breed, index) => (
							<option key={index} value={breed}>
								{breed}
							</option>
						))
					) : (
						dogBreeds.map((breed, index) => (
							<option key={index} value={breed}>
								{breed}
							</option>
						))
					)}
				</NativeSelect>
			</Grid>
			<Grid item xs={12} sm={4}>
				<TextField
					required
					id='name'
					name='name'
					label='Name'
					type='text'
					fullWidth
					color='secondary'
					autoComplete='Name'
					variant='standard'
					value={formData.name}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={4} alignContent='center'>
				<NativeSelect
					defaultValue='Adoption Status'
					required
					fullWidth
					inputProps={{
						name: 'adoption_status',
						id: 'adoption_status',
					}}
					value={formData.adoption_status}
					onChange={handleChange}
				>
					<option disabled>Adoption Status</option>
					<option value={'Adopted'}>Adopted</option>
					<option value={'Fostered'}>Fostered</option>
					<option value={'Available'}>Available</option>
				</NativeSelect>
			</Grid>
			<Grid item xs={12} sm={4}>
				<TextField
					required
					id='weight'
					name='weight'
					label='Weight (kg)'
					type='number'
					fullWidth
					autoComplete='Weight'
					color='secondary'
					variant='standard'
					value={formData.weight}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<TextField
					required
					id='height'
					name='height'
					label='Height (cm)'
					type='number'
					fullWidth
					autoComplete='Height'
					color='secondary'
					variant='standard'
					value={formData.height}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<FormControlLabel
					control={
						<Checkbox
							color='secondary'
							name='hypoallergenic'
							checked={formData.hypoallergenic}
							onChange={handleCheckboxChange}
						/>
					}
					label='Hypoallergenic'
					sx={{ width: '100%' }}
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<TextField
					required
					id='color'
					name='color'
					label='Color'
					type='text'
					fullWidth
					autoComplete='Color'
					color='secondary'
					variant='standard'
					value={formData.color}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={4}>
				<TextField
					id='dietary_restrictions'
					name='dietary_restrictions'
					label='Dietary Restrictions'
					type='text'
					fullWidth
					color='secondary'
					variant='standard'
					value={formData.dietary_restrictions}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					id='bio'
					name='bio'
					label='Bio'
					type='textarea'
					fullWidth
					color='secondary'
					variant='standard'
					value={formData.bio}
					onChange={handleChange}
				/>
			</Grid>
		</Grid>
	);
}

const catBreeds = [
	'Abyssinian',
	'Aegean',
	'American Bobtail',
	'American Curl',
	'American Shorthair',
	'American Wirehair',
	'Aphrodite Giant',
	'Arabian Mau',
	'Ashera',
	'Asian Longhair',
	'Asian Shorthair',
	'Australian Mist',
	'Aztec',
	'Balinese',
	'Balinese Modern',
	'Bambino',
	'Bengal',
	'Birman',
	'Bombay',
	'Bramble',
	'Brazilian Shorthair',
	'British Longhair',
	'British Shorthair',
	'Burmese',
	'Burmilla',
	'Chartreux',
	'Chausie',
	'Cornish Rex',
	'Cyprus',
	'Devon Rex',
	'Dragon Li',
	'Egyptian Mau',
	'Exotic',
	'Himalayan',
	'Javanese',
	'Korat',
	'LaPerm',
	'Lykoi',
	'Maine Coon',
	'Manx',
	'Minskin',
	'Norwegian Forest Cat',
	'Ocicat',
	'Oriental Longhair',
	'Oriental Shorthair',
	'Persian Modern',
	'Persian Traditional',
	'Ragamuffin',
	'Ragdoll',
	'Russian Blue',
	'Savannah',
	'Scottish Fold',
	'Selkirk Rex',
	'Siamese',
	'Siamese Modern',
	'Siberian',
	'Singapura',
	'Snowshoe',
	'Sphynx',
	'Tonkinese',
	'Turkish Angora',
	'Turkish Van',
];
const dogBreeds = [
	'Affenpinscher',
	'Afghan Hound',
	'Airedale Terrier',
	'Akita',
	'Alaskan Klee Kai',
	'Alaskan Malamute',
	'American Bulldog',
	'American Cocker Spaniel',
	'American Eskimo Dog',
	'American Hairless Terrier',
	'American Leopard Hound',
	'American Pit Bull Terrier',
	'American Staffordshire Terrier',
	'American Water Spaniel',
	'Anatolian Shepherd Dog',
	'Aussiedoodle',
	'Australian Cattle Dog',
	'Australian Kelpie',
	'Australian Labradoodle',
	'Australian Shepherd',
	'Australian Silky Terrier',
	'Australian Terrier',
	'Australian Working Kelpie',
	'Azawakh',
	'Basenji',
	'Bassador',
	'Basset Bleu De Gascogne',
	'Basset Fauve De Bretagne',
	'Basset Hound',
	'Bassugg',
	'Bavarian Mountain Hound',
	'Beagador',
	'Beagle',
	'Beaglier',
	'Bearded Collie',
	'Beauceron',
	'Bedlington Terrier',
	'Bedlington Whippet',
	'Belgian Groenendael',
	'Belgian Laekenois',
	'Belgian Malinois',
	'Belgian Shepherd',
	'Belgian Tervuren',
	'Bergamasco',
	'Bernedoodle',
	'Bernese Mountain Dog',
	'Bichon Frise',
	'Bichon Yorkie',
	'Bich-poo',
	'Biewer Terrier',
	'Black and Tan Coonhound',
	'Black Russian Terrier',
	'Bloodhound',
	'Blue Lacy',
	'Bluetick Coonhound',
	'Boerboel',
	'Bolognese',
	'Borador',
	'Border Collie',
	'Border Jack',
	'Border Terrier',
	'Bordoodle',
	'Borzoi',
	'Boston Terrier',
	'Bouvier Des Flandres',
	'Boxador',
	'Boxer',
	'Bracco Italiano',
	'Braque D&aposAuvergne',
	'Briard',
	'Brittany',
	'Bugg',
	'Bullmastiff',
	'Bull Pei',
	'Bull Terrier',
	'Cairn Terrier',
	'Canaan Dog',
	'Canadian Eskimo Dog',
	'Cane Corso Italiano',
	'Cardigan Welsh Corgi',
	'Catahoula Leopard Dog',
	'Catalan Sheepdog',
	'Caucasian Shepherd Dog',
	'Cavachon',
	'Cavalier King Charles Spaniel',
	'Cavapom',
	'Cavapoo',
	'Cavapoochon',
	'Cava Tzu',
	'Cesky Terrier',
	'Cheagle',
	'Chesapeake Bay Retriever',
	'Chihuahua',
	'Chinook',
	'Chipoo',
	'Chi Staffy Bull',
	'Chiweenie',
	'Chorkie',
	'Chow Chow',
	'Chow Shepherd',
	'Chug',
	'Chusky',
	'Cirneco Dell&aposEtna',
	'Clumber Spaniel',
	'Cockachon',
	'Cockador',
	'Cockapoo',
	'Cocker Spaniel',
	'Cojack',
	'Corgi',
	'Coton De Tulear',
	'Curly Coated Retriever',
	'Dachshund',
	'Dalmatian',
	'Dameranian',
	'Dandie Dinmont Terrier',
	'Deerhound',
	'Dobermann',
	'Dogue de Bordeaux',
	'Dorkie',
	'Doxiepoo',
	'Dutch Shepherd',
	'English Bulldog',
	'English Coonhound',
	'English Setter',
	'English Toy Terrier',
	'Entlebucher Mountain Dog',
	'Estrela Mountain Dog',
	'Eurasier',
	'Field Spaniel',
	'Finnish Lapphund',
	'Finnish Spitz',
	'Flat-Coated Retriever',
	'Foxhound',
	'Fox Terrier',
	'French Bulldog',
	'French Bull Jack',
	'Frenchie Staff',
	'French Pin',
	'Frug',
	'Gerberian Shepsky',
	'German Longhaired Pointer',
	'German Pinscher',
	'German Shepherd',
	'German Sheprador',
	'German Shorthaired Pointer',
	'German Spitz',
	'German Wirehaired Pointer',
	'Giant Schnauzer',
	'Glen Of Imaal Terrier',
	'Goberian',
	'Goldendoodle',
	'Golden Dox',
	'Golden Labrador',
	'Golden Retriever',
	'Golden Shepherd',
	'Gordon Setter',
	'Grand Basset Griffon Vendeen',
	'Grand Bleu De Gascogne',
	'Great Dane',
	'Great Pyrenees',
	'Greater Swiss Mountain Dog',
	'Greek Harehound',
	'Greenland Dog',
	'Greyhound',
	'Griffon Bruxellois',
	'Griffon Fauve De Bretagne',
	'Hairless Chinese Crested',
	'Hamiltonstovare',
	'Harrier',
	'Havanese',
	'Horgi',
	'Hovawart',
	'Hungarian Kuvasz',
	'Hungarian Puli',
	'Hungarian Pumi',
	'Hungarian Vizsla',
	'Ibizan Hound',
	'Icelandic Sheepdog',
	'Irish Doodle',
	'Irish Red & White Setter',
	'Irish Setter',
	'Irish Terrier',
	'Irish Water Spaniel',
	'Irish Wolfhound',
	'Italian Greyhound',
	'Italian Spinone',
	'Jack-A-Bee',
	'Jackahuahua',
	'Jack-A-Poo',
	'Jack Russell Terrier',
	'Jackshund',
	'Jacktzu',
	'Japanese Akita',
	'Japanese Chin',
	'Japanese Shiba',
	'Japanese Spitz',
	'Johnson American Bulldog',
	'Jug',
	'Keeshond',
	'Kerry Blue Terrier',
	'King Charles Spaniel',
	'Kokoni',
	'Komondor',
	'Kooikerhondje',
	'Korean Jindo',
	'Korthals Griffon',
	'Labradoodle',
	'Labrador Retriever',
	'Lachon',
	'Lagotto Romagnolo',
	'Lakeland Terrier',
	'Lancashire Heeler',
	'Large Munsterlander',
	'Leonberger',
	'Lhasa Apso',
	'Lhasapoo',
	'Lhatese',
	'Löwchen',
	'Lurcher',
	'Mal-Shi',
	'Maltese',
	'Maltichon',
	'Maltipom',
	'Malti-Poo',
	'Manchester Terrier',
	'Maremma Sheepdog',
	'Mastiff',
	'Mexican Hairless',
	'Miniature Bull Terrier',
	'Miniature Pinscher',
	'Miniature Poodle',
	'Miniature Schnauzer',
	'Miniature Schnoxie',
	'Mixed Breed',
	'Morkie',
	'Neapolitan Mastiff',
	'Newfoundland',
	'New Zealand Huntaway',
	'Norfolk Terrier',
	'Northern Inuit',
	'Norwegian Buhund',
	'Norwegian Elkhound',
	'Norwich Terrier',
	'Nova Scotia Duck Tolling Retriever',
	'Old English Sheepdog',
	'Otterhound',
	'Papillon',
	'Parson Russell Terrier',
	'Patterdale Terrier',
	'Peek-a-poo',
	'Pekingese',
	'Pembroke Welsh Corgi',
	'Petit Basset Griffon Vendeen',
	'Pharaoh Hound',
	'Picardy Sheepdog',
	'Pitsky',
	'Plott Hound',
	'Pointer',
	'Polish Lowland Sheepdog',
	'Pomapoo',
	'Pomchi',
	'Pomeranian',
	'Pomsky',
	'Poodle',
	'Portuguese Podengo',
	'Portuguese Pointer',
	'Portuguese Water Dog',
	'Powderpuff Chinese Crested',
	'Pug',
	'Pugalier',
	'Pugapoo',
	'Puggle',
	'Pugzu',
	'Pyrenean Mastiff',
	'Pyrenean Shepherd',
	'Rat Terrier',
	'Redbone Coonhound',
	'Rescue Dog',
	'Rhodesian Ridgeback',
	'Rottweiler',
	'Rough Collie',
	'Russian Toy',
	'Saluki',
	'Samoyed',
	'Schipperke',
	'Schnauzer',
	'Schnoodle',
	'Scottish Terrier',
	'Sealyham Terrier',
	'Segugio Italiano',
	'Shar Pei',
	'Sheepadoodle',
	'Shetland Sheepdog',
	'Shih-poo',
	'Shih Tzu',
	'Shollie',
	'Shorkie',
	'Siberian Cocker',
	'Siberian Husky',
	'Skye Terrier',
	'Sloughi',
	'Slovakian Rough Haired Pointer',
	'Small Munsterlander',
	'Smooth Collie',
	'Soft Coated Wheaten Terrier',
	'Spanish Water Dog',
	'Sporting Lucas Terrier',
	'Springador',
	'Springer Spaniel',
	'Sprocker',
	'Sprollie',
	'Sproodle',
	'Stabyhoun',
	'Staffador',
	'Staffordshire Bull Terrier',
	'Staffy Jack',
	'St. Bernard',
	'Sussex Spaniel',
	'Swedish Lapphund',
	'Swedish Vallhund',
	'Tamaskan',
	'Terri-Poo',
	'Tibetan Mastiff',
	'Tibetan Spaniel',
	'Tibetan Terrier',
	'Toy Fox Terrier',
	'Toy Poodle',
	'Trailhound',
	'Treeing Walker Coonhound',
	'Turkish Kangal Dog',
	'Weimaraner',
	'Welsh Springer Spaniel',
	'Welsh Terrier',
	'West Highland White Terrier',
	'Westiepoo',
	'Whippet',
	'White Swiss Shepherd Dog',
	'Working Cocker Spaniel',
	'Yorkie Russell',
	'Yorkipoo',
	'Yorkshire Terrier',
	'Zuchon',
];

AddInfo.propTypes = {
	formData: PropTypes.object,
	setFormData: PropTypes.func,
};
