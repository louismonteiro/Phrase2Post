const readlineSync = require('readline-sync');
const vagalumeApi = require('../vagalume')
console.log(vagalumeApi);

module.exports = setupPhrase2Post = () => {
	const vagalume = new Vagalume(process.env.VAGALUME_API_KEY);
	const app = {};

	app.description = "User questionnaire to setup the robot";
	app.artist = null;

	app.startQuestionnaire = async () => {
		app.artist = askForArtist(); // optional
		if(!app.artist) app.artist = await getRandomArtist();


		app.music = askForMusic(); // optional
		if(!app.music) app.music = await getRandomMusic(app.artist);
	}

	getRandomLetter = () => {
		const characters = 'abcdefghijklmnopqrstuvwxyz';
		return characters.charAt(Math.floor(Math.random() * characters.length))
	}

	getRandomArrayItem = (myArray = []) => {
		return myArray[Math.floor(Math.random() * myArray.length)]
	}

	askForArtist = () => {
		return artist = readlineSync.question('Artist:') || null;		
	}

	getRandomArtist = async () => {
		answer = await vagalume.search('art', getRandomLetter());
		all_artists = answer.response.docs;
		artist = getRandomArrayItem(all_artists);
		return artist.band;
	}

	askForMusic = () => {
		return music = readlineSync.question(`What of ${app.artist} you want?`);
	}

	getRandomMusic = async () => {
		answer = await vagalume.discography(app.artist, {});
		//all_musics = answer.response.discography.items;
		console.log(answer)
	}

	return app;
};