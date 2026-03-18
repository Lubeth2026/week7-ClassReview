"use strict";

console.log("Hello");

//Basic Request with an Input Field Example//
const form = document.getElementById("searchForm");
const output = document.getElementById("output");
const input = document.getElementById("search");

//Function is getting Data//
async function getPokemon(url, pokemon) {
    try {
       const res = await fetch(url + pokemon); 

       if(!res.ok){
        throw new Error("Failed Fetch")
       }

       const pokemonData = await res.json()
       return pokemonData
    } catch (error) {
       console.error(error) 
    }
}
function renderNotFound(){
    output.textContent = ""
    const p = document.createElement("p");
    p.textContent = "Sorry not found!"
    output.appendChild(p)
}
//Rendering the Function//
function renderPokemon(pokemonData){
    output.textContent = ""
    const img = document.createElement("img")
    img.classList.add("border")
    img.src = pokemonData.sprites.front_default
    img.alt = pokemonData.name
    const name = document.createElement("p")
    name.textContent = pokemonData.name

    output.appendChild(img)
    output.appendChild(name)
}
function clearFields(){
    input.value = ""
}
async function main() {
    form.addEventListener("submit", async(event)=>{
        event.preventDefault();
        const pokemonName = input.value
        const URL = "https://pokeapi.co/api/v2/pokemon/";
         const pokemonData = await getPokemon(URL,pokemonName);
         if(!pokemonData){
            renderNotFound()
         }else{
         updateHistory(pokemonName);
         renderPokemon(pokemonData);
         clearFields();
         const hist = getHistory();
         renderHistory();
        }
    })
    const hist = getHistory()
    renderHistory(hist);
}
main()

//End of Example Logic//



//Local Storage Logic Example with API//
const historyArea = document.getElementById("history");
function getHistory(){
    const localHistory = localStorage.getItem("history");
    if (!localHistory) {
       return [];
     }
     return JSON.parse(localHistory); 
}
//Update Pokemon API from above//
function updateHistory(search){
    const current = getHistory();
    current.push(search)
    localStorage.setItem("history", JSON.stringify(current))
}
function renderHistory(hist){
    historyArea.textContent = ""
    hist.forEach((searchEntry)=>{
        const p = document.createElement("p");
        p.textContent = searchEntry
        historyArea.appendChild(p)
    });
}
//End of API Local Storage Logic Example//


//Local Storage Logic Example//
//const user = {
//    name: "Lubeth",
//    isOnline: true,
//    birthdate: "1-27-1234"
//}
// const stringedUser = JSON.stringify(user)
//localStorage.setItem("someUser", stringedUser)
//localStorage.clear
//const myData = localStorage.getItem("someUser");
//const usableData = JSON.parse(myData);
//console.log(myData)
//End of Example//