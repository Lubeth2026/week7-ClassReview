"use strict";

console.log("Greetings!");

//Basic Object Literal//
const pokeRequest = {
    method: "GET",
    baseURL: "https://example.com",
    endpoints: ["pokemon", "/pokemon/ditto"],
    renderPokemon(pokemonData){
//Clears the previous Pokemon//
//And then renders new Pokemon//
//Transforms and displays the data//
    }
}
//Factory Function//
function sendRequestObjectFactory(method, baseURL, endpoints){
    return {
        method, baseURL, endpoints
    }
}
console.log([])
//Constructor Function//
//Original way to Object Orient//
function SwapiRequestRules(method, baseURL, endpoints){
    this.method = method;
    this.baseURL = baseURL;
    this.endpoints = endpoints;
}
//Example of Logic Constructor Code Use//
const swapi = new SwapiRequestRules("GET", "https://swapi.api.com", ["/people", "/planets"]);
SwapiRequestRules.prototype.renderSwapi = function(){
//Clears previous request data from DOM//
//Appends new data to DOM//
console.log("Finished Rendering") 
}

class SendRequestClass {
     constructor(method, baseURL, endpoints){
      this.method = method;
      this.baseURL = baseURL;
      this.endpoints = endpoints; 
      this.data = {}
     } 
     renderTheRequest(){
     this.data
     }
}
const newRequest = new SendRequestClass("GET", "https://www.example.com", ["google"])
async function getData(url) {
    try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error("Failed Fetch")
        }

        const data = await res.json()
        newRequest.data = data
    } catch (error) {
       console.error(error) 
    }
}
//End of Example//

//Optional Properties/Parameters Example//
function getDataObj(options){
    return{
        method: options.method || "GET",
        baseURL: options.baseURL,
        endpoints: options.endpoints || []
    }
}
//End of Example//


//Asynchronous Methods//Example
//Constructor runs synchronously no need for async in front//
class Person {
    constructor(){
      this.name
      this.birthYear
      this.height
    }
   async init(url){
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      this.name = data[0].name;  
      this.birthYear = data[0].birthYear; 
      this.height = data[0].height
    } catch (error) {
      console.error("Error")  
    }
   }
   render(){
    //this.name//
   }
}
const user = new Person()
user.init("https://swapi.info/api/people/");
//End of Example//

