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
		arrayIndex = Math.floor(Math.random() * (myArray.length-1));
		console.log("myArray", myArray);
		console.log("myArray length", myArray.length);
		console.log("arrayIndex", arrayIndex);
		return myArray[arrayIndex]
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
		answer = await vagalume.discography(app.artist, []);
		all_lyrics = answer.artist.lyrics.item;
		lyric = getRandomArrayItem(all_lyrics);
		lyric_name = lyric.desc;
		return lyric_name;
	}

	return app;
};