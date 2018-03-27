/* -------------------------------------------------------------------------------------------------------- */
/* ---------- Display Episode Information by passing episode object -------------------------------------- */
/* ------------------------------------------------------------------------------------------------------ */
const getEpisodeInfo = episode => {

    // Check if image exist
    if (episode.image) {
        console.log(`%c          `, `font-size: 100px; background: url(${episode.image.medium}) no-repeat;`);
    }

    console.log(`%cEpisode Name: ${episode.name}`, `font-size:20px;  font-family:cursive;`);

    // Log remaining details
    for (let index in episode) {

        // Replacing unwanted characters and logging 
        console.log(`%c・ ${index.replace('_','')}: ${JSON.stringify(episode[index]).replace('",',',\n').replace('<p>','').replace('</p>','')}`, `font-size:15px;`);
    }
    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
};

/* -------------------------------------------------------------------------------------------------------- */
/* ---------- Display Episode Information by passing Season Number and Episode number -------------------- */
/* ------------------------------------------------------------------------------------------------------ */
const getEpisodeBySeaNoEpiNo = (seasonNumber = 0, episodeNumber = 0) => {

    // Loop through the episodes
    for (let episode of bbtDataStore['_embedded'].episodes) {

        // Check if parameters matches
        if (episode.season === Number(seasonNumber) && episode.number === Number(episodeNumber)) {

            getEpisodeInfo(episode);

            // Come out of the function
            return;
        }
    }

    // If parameters didn't matched
    console.log('%c         ', 'font-size:200px; background: url(https://res.cloudinary.com/gscode/image/upload/c_scale,h_235,w_260/v1522091598/notfound.png) no-repeat;');

    console.error(`Episode information not found for season number ${seasonNumber} and episode number ${episodeNumber}`);
};

/* -------------------------------------------------------------------------------------------------------- */
/* ---------- Display Episode Information by passing id -------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------ */
const getEpisodeByIds = (...ids) => {

    let idFound = false;

    // Loop through passed arguments
    for (let id of ids) {

        // Loop through episodes
        for (let episode of bbtDataStore['_embedded'].episodes) {

            // Check if id matches
            if (episode.id === Number(id)) {

                getEpisodeInfo(episode);
                idFound = true;

                // Break out of inner loop
                break;

            } else {
                idFound = false;
            }
        }

        // If id didn't matched
        if (!idFound) {
            console.log('%c         ', 'font-size:200px; background: url(https://res.cloudinary.com/gscode/image/upload/c_scale,h_235,w_260/v1522091598/notfound.png) no-repeat;');
            console.error(`Episode information not found for id ${id}`);
        }
    }
};

/* -------------------------------------------------------------------------------------------------------- */
/* ---------- Display Episode Information by pssing name -------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------ */
const getEpisodeByName = (name = 'abc') => {

    // Loop through episodes
    for (let episode of bbtDataStore['_embedded'].episodes) {

        // Check if name matches
        if (episode.name.toLowerCase() === name.toLowerCase()) {

            getEpisodeInfo(episode);

            // Come out of the function
            return;
        }
    }

    // If name didn't matched
    console.log('%c         ', 'font-size:200px; background: url(https://res.cloudinary.com/gscode/image/upload/c_scale,h_235,w_260/v1522091598/notfound.png) no-repeat;');
    console.error(`Episode information not found for name ${name}`);
};

/* -------------------------------------------------------------------------------------------------------- */
/* ---------- Display Information of all episodes -------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------ */
const getAllEpisodes = () => {
    
    // Image
    console.log(`%c          `, `font-size: 250px; background: url(${bbtDataStore['image'].medium}) no-repeat;`);
    // Summary
    console.log(`%c\t\t${bbtDataStore['summary'].replace('<p>','').replace('</p>','').replace('<b>','').replace('</b>','')}`, `font-size:17px;  font-family:cursive;`);
    // URL
    console.log(`%cLink: ${bbtDataStore['url'].replace('//','/')}`, 'font-size:15px; font-family:cursive;');
    // Header
    console.log(`%c\nEpisodes:`, `font-size:20px; color:red; font-family:cursive;`);

    // Loop through each episodes
    for (let episode of bbtDataStore['_embedded'].episodes) {
        getEpisodeInfo(episode);
    }

    console.log('%cKindly refresh if all Episodes were not logged!!', 'color:red; font-size:30px; font-family:cursive;');
}

/* ----------------------------------------------------------------------------------- */
/* ------------- Self invoking function --------------------------------------------- */
/* -------------------------------------------------------------------------------- */
(() => {

    //getEpisodeBySeaNoEpiNo('0', '2');
    //getEpisodeByIds(...[663422, 1, 6, 642013]);
    //getEpisodeByName('The Spock Resonance');
    getAllEpisodes();

})();