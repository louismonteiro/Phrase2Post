const setup = require('./setup')();
const lyricsToArray = require('./lyricsToArray');
const imageGen = require('./imageGen');
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
	app.lyricsArray.forEach(async (el, index) => {
		await imageGen(el, './output', `img${index}`)
	});
})()


//lyricsToArray(app.lyrics)