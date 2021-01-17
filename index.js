const setup = require('./setup')();
const lyricsToArray = require('./lyricsToArray');
const app = {
	artist: null,
	music: null,
	lyrics: null,
	lyricsArray: null
};

(async function run(){
	await setup.startQuestionnaire();
	app.artist = setup.artist;
	app.music = setup.music;
	app.lyrics = setup.lyrics;
	app.lyricsArray = await lyricsToArray(app.lyrics)
	console.log(app);
})()


//lyricsToArray(app.lyrics)