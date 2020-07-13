const search = document.querySelector('#search');
const matchResults = document.querySelector('#match-results');

//Function to Search States and Filter it:
const searchStates = async searchText =>{
    const resp = await fetch('../state_capitals.json');
    const states = await resp.json();
  
    //Using Regex to match input:
    let matches = states.filter( state => {
        const regex = new RegExp(`^${searchText}`, `gi`);
        return state.name.match(regex) || state.abbr.match(regex);
    })
    if(searchText.length === 0) matches = [];


    drawUi(matches);
};

//Draw UI:
const drawUi = matches => {
    if(matches.length >0){
        const html = matches.map( match => `<div class="card card-body alert alert-dismissible alert-success mb-1"><h4> ${match.name}  ${match.abbr} <span class="text-info">${match.capital}</span></h4><small>lat: ${match.lat} long: ${match.long}</small></div>`
        ).join('')
        matchResults.innerHTML = html;
    }else{
        matchResults.innerHTML = '';
    }
}


//QUERY States on INPUT event:
search.addEventListener('input', ()=> searchStates(search.value));



