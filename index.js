    const filmDetailsUrl = 'http://localhost:3001/films/1';
    const filmsUrl = 'http://localhost:3000/films';

  // Fetch and display the movie details
  fetch(filmDetailsUrl)
    .then((response) => response.json())
    .then((film) => {
      currentFilm = film;
      displayFilmDetails(film);
    })
    

  // Fetch and show the list of films
  fetch(filmsUrl)
    .then((response) => response.json())
    .then((films) => populateFilmList(films))
    .catch((error) => console.error('Error fetching films:', error));

  function populateFilmList(films) {
    const filmList = document.getElementById('films');
    filmList.innerHTML = '';

    films.forEach((film) => {
      const li = document.createElement('li');
      li.className = 'film item';
      li.textContent = film.title;
      li.addEventListener('click', () => displayFilmDetails(film));
      filmList.appendChild(li);
    });
  }

  function displayFilmDetails(film) {
    currentFilm = film;
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');

    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = `Runtime: ${film.runtime} minutes`;
    showtime.textContent = `Showtime: ${film.showtime}`;
    availableTickets.textContent = `Available Tickets: ${
      film.capacity - film.tickets_sold
    }`;
  }
  const buyTicketButton = document.getElementById('buy-ticket');
  buyTicketButton.addEventListener('click', () => {
    if (currentFilm.capacity - currentFilm.tickets_sold > 0) {
      currentFilm.tickets_sold++;
      displayFilmDetails(currentFilm);
    } else {
      alert('It is sold out!');
    }
  });
