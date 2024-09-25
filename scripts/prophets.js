const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url); // Fetch data from the URL
    const data = await response.json(); // Convert the response to JSON
    // console.table(data.prophets); // Uncomment this line to check the data in console (testing purpose)
    displayProphets(data.prophets); // Call displayProphets function with data.prophets as argument
  }
  
  // Step 4: Call the getProphetData function to fetch and display the prophets data
  getProphetData();
  
  // Step 5: Define a function to display the prophets' data
  const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      let fullName = document.createElement('h2'); // Create an h2 element for the full name
      let birthDate = document.createElement('p'); // Create a p element for the date of birth
      let birthPlace = document.createElement('p'); // Create a p element for the place of birth
      let portrait = document.createElement('img'); // Create an img element
  
      // Build the h2 content to show the prophet's full name
      fullName.textContent = `${prophet.name} ${prophet.lastname}`; // Prophet's full name
  
      // Build the Date of Birth and Place of Birth content
      birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
      birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
  
      // Build the image portrait by setting all relevant attributes
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      // Append the created elements to the section(card)
      card.appendChild(fullName); // Append fullName
      card.appendChild(birthDate); // Append birthDate
      card.appendChild(birthPlace); // Append birthPlace
      card.appendChild(portrait); // Append portrait
  
      // Append the section (card) to the div with id "cards"
      cards.appendChild(card);
    });
  };
  