function buildRoot() {
  const root = document.querySelector('#root');
  root.innerHTML =
    '<div id="mainDiv">' +
    '<div id="navBar"><img id="logo" src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg">by DiegoK</div>' +
    '<div id="main">' +
    '<div id="navLeft">' +
    '<div id="leftContent"></div>' +
    '<button id="loadMore">Load More</button>' +
    '</div>' +
    '<div id="mainContent"></div>' +
    '</div>' +
    '</div>';
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML =
    '<div class="titleImg"><img src="https://www.cinemascomics.com/wp-content/uploads/2021/12/rick-y-morty-navidad-video-rap.jpg" /></div>';
}

function loadEpisodes(url) {
  fetch(url || 'https://rickandmortyapi.com/api/episode')
    .then((res) => res.json())
    .then((episodes) => showEpisodeLinks(episodes))
    .catch((reason) => console.log(reason));
}

function showEpisodeLinks(episodes) {
  const episodesContainer = document.querySelector('#leftContent');
  episodes.results.map((episode) => createEpisodeLink(episode)).forEach((node) => episodesContainer.appendChild(node));
  const loadMore = document.querySelector('#loadMore');
  if (episodes.info.next) {
    loadMore.onclick = () => loadEpisodes(episodes.info.next);
  } else {
    loadMore.classList.add('hidden');
  }
}

function createEpisodeLink(episode) {
  const episodeLink = document.createElement('div');
  episodeLink.classList.add('episodeLink');
  episodeLink.innerText = episode.name;
  episodeLink.addEventListener('click', () => showEpisodeDetail(episode));
  return episodeLink;
}

function showEpisodeDetail(episode) {
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML = `<h2>${episode.name}</h2>` + `<h3>${episode.episode} | ${episode.air_date} </h3>`;
  const charactersContainer = document.createElement('div');
  charactersContainer.id = 'charactersContainer';
  mainContent.appendChild(charactersContainer);
  episode.characters.forEach((characterUrl) => createCharacterCard(charactersContainer, characterUrl));
}

function createCharacterCard(parent, characterUrl) {
  const div = document.createElement('div');
  div.classList.add('characterCard');
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => renderCharacterCard(div, character));
  parent.appendChild(div);
}

function renderCharacterCard(parent, character) {
  parent.addEventListener('click', () => showCharacterDetail(character));
  parent.innerHTML = `<img src=${character.image}>` + `<h4>${character.name}</h4>` + `<h5>${character.species} | ${character.status}</h5>`;
}

function showCharacterDetail(character) {
  const mainContent = document.querySelector('#mainContent');
  mainContent.innerHTML =
    `<div><div class='characterCardDetailHeader'>
      <div><img src=${character.image}></div>
      <div><h2>${character.name}</h2>` +
    `<h3>${character.status} | ${character.species} | ${character.gender} | ${character.origin.name} </h3>
    <div class='locationButton'><button id='locationButton'>Get Location</button></div></div></div>
      <div class='characterCardDetail'></div>
  </div> `;
  const locationButton = document.querySelector('#locationButton');
  locationButton.addEventListener('click', () => renderLocation(character.origin.url));
  console.log(character.origin.name);

  character.episode.forEach((episode) => {
    fetch(episode)
      .then((res) => res.json())
      .then((episodes) => {
        const characterEpisodes = document.querySelector('.characterCardDetail');
        const characterEpisodesDetail = document.createElement('div');
        characterEpisodesDetail.className = 'characterEpisodesDetail';
        characterEpisodes.appendChild(characterEpisodesDetail);
        characterEpisodesDetail.innerHTML = `<div class='episodeNumber'><h3>Episode - ${episodes.id}</h3><h4 class="card-title">${episodes.episode}</h4></div>`;
        characterEpisodesDetail.onclick = () => showEpisodeDetail(episodes);
      });
  });
}

function renderLocation(origin) {
  fetch(origin)
    .then((res) => res.json())
    .then((origin) => {
      const characterCardDetailHeader = document.querySelector('.characterCardDetailHeader');
      characterCardDetailHeader.innerHTML = '<div><div>' + `<h1>${origin.name}</h1><h3>${origin.type} - ${origin.dimension}</h3>` + '</div>';
      const characterCard = document.querySelector('.characterCardDetail');
      characterCard.innerHTML = '';
      origin.residents.forEach((resident) => {
        fetch(resident)
          .then((res) => res.json())
          .then((character) => {
            const episodeCard = document.createElement('div');
            episodeCard.innerHTML = `<img src="${character.image}"><h4>${character.name}</h4><h5>${character.species} | ${character.status}</h5></div></div>`;
            episodeCard.className = 'characterCard';
            console.log(character.url);
            episodeCard.onclick = () => showCharacterDetail(character);
            characterCard.appendChild(episodeCard);
          });
      });
    });
}

function createEpisodeData(episode) {
  const episodeData = document.createElement('div');
  episodeData.classList.add('episodeData');
  episodeData.innerText = episode;
  return episodeData;
}

loadEpisodes();
buildRoot();
