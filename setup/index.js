const readlineSync = require('readline-sync');
const vagalumeApi = require('../vagalume')

module.exports = setupPhrase2Post = () => {
	const vagalume = new Vagalume(process.env.VAGALUME_API_KEY);
	const app = {};

	app.description = "User questionnaire to setup the robot";
	app.artist = null;
	app.music = null;
	app.lyrics = null;

	app.startQuestionnaire = async () => {
		app.artist = askForArtist(); // optional
		if(!app.artist) app.artist = await getRandomArtist();

		app.music = askForMusic(); // optional
		if(!app.music) app.music = await getRandomMusic(app.artist);

		app.lyrics = getLyrics();
	}

	getRandomLetter = () => {
		const characters = 'abcdefghijklmnopqrstuvwxyz';
		return characters.charAt(Math.floor(Math.random() * characters.length))
	}

	getRandomArrayItem = (myArray = []) => {
		arrayIndex = Math.floor(Math.random() * (myArray.length-1));
		return myArray[arrayIndex]
	}

	askForArtist = () => {
		return artist = readlineSync.question('Artist:') || null;		
	}

	getRandomArtist = async () => {
		try{
			answer = await vagalume.search('art', getRandomLetter());
			all_artists = answer.response.docs;
			artist = getRandomArrayItem(all_artists);
			return artist.band;
		} catch(e){
			console.log('Sorry, something went wrong when we were looking for music of ', app.artist);
		}
		
	}

	askForMusic = () => {
		return music = readlineSync.question(`What music of ${app.artist} you want?`);
	}

	getRandomMusic = async () => {
		answer = await vagalume.discography(app.artist, []);
		all_musics = answer.artist.lyrics.item;
		music = getRandomArrayItem(all_musics);
		music_name = music.desc;
		return music_name;
	}

	getLyrics = async () => {
		answer = await vagalume.lyrics({art: app.artist, mus: app.music})
		lyrics = answer.mus[0].text;
		return lyrics
	}

	return app;
};