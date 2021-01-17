module.exports = lyricsToArray = (lyrics) => {
	
	try{
		all_lines = lyrics.split('\n');
		grouped_lines = [];
		
		for( let i = 0; i < Math.ceil(all_lines.length/4); i++ ){
			grouped_lines.push(all_lines.slice(i*4, i*4+4))
		}

		return grouped_lines;

	} catch(e){
		console.log("Error while splitting the lyrics:", lyrics);
	}
	
	return false;

}