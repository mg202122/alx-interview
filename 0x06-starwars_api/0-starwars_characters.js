#!/usr/bin/node

const request = require('request');

// Retrieve movie ID from command line argument
const movieId = process.argv[2];

if (!movieId) {
  console.error('Please provide a movie ID as a command line argument.');
  process.exit(1);
}

// Make request to get movie details
request.get(`https://swapi-api.alx-tools.com/api/films/${movieId}`, (error, response, body) => {
  if (error) {
    console.error('Error making API request:', error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error('API request failed with status code:', response.statusCode);
    process.exit(1);
  }

  const movie = JSON.parse(body);

  // Fetch each character in the movie
  const characters = movie.characters;
  const characterPromises = characters.map((characterUrl) => {
    return new Promise((resolve, reject) => {
      request.get(characterUrl, (error, response, body) => {
        if (error) {
          reject(error);
        }

        if (response.statusCode !== 200) {
          reject(new Error(`API request failed with status code: ${response.statusCode}`));
        }

        const character = JSON.parse(body);
        resolve(character.name);
      });
    });
  });

  // Print characters once all promises are resolved
  Promise.all(characterPromises)
    .then((characterNames) => {
      characterNames.forEach((name) => {
        console.log(name);
      });
    })
    .catch((error) => {
      console.error('Error fetching character details:', error);
      process.exit(1);
    });
});
