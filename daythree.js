"use strict";

console.log("Hello");

const output = document.getElementById("output");
const inputArea = document.getElementById("inputArea");
const prompt = document.getElementById("prompt");

//GET Proxy-key//
async function getKey() {
   try {
     const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
     };
     const res = await fetch("https://proxy-key-t0ox.onrender.com/get-key", options);

     if(!res.ok){
        throw new Error("Bad");
     }

     const {key} = await res.json()
     //console.log(key)
     return key 
   } catch (error) {
    console.error("Didn't get the key")
   }
}

async function promptToAPI(url, options) {
    try {
      const res = await fetch(url, options);
      
      if(!res.ok){
        throw new Error("Didn't get Data")
      }

      const {result} = await res.json();
      return result
    } catch (error) {
      console.error(error)  
    }
}

function render(response){
    output.textContent = ""
    const p = document.createElement("p");
    p.textContent = response
    output.appendChild(p)
}

async function main() {
    try {
        inputArea.addEventListener("submit", async(event)=>{
            event.preventDefault()
            const corsURL = "https://corsproxy.io/?url=";
            const workersEndpoint = "https://api.cloudflare.com/client/v4/accounts/82bd1d2acadf816a51be4a65b1c64317/ai/run/@cf/meta/llama-3-8b-instruct";
            const url = corsURL + workersEndpoint
            const key = await getKey();
            
            const promptBody = {
                messages: [
                    {role: "system", content: "You are a sales rep trying to make sales on Clarinets, Saxophones, Drums, Guitars, Trumpets, Trombones, and French Horns. You do not go off topic, you only tell the products or info about what a product is. Never respond with more than 15 words, and never list every single product, perhaps ask a question.", },
                    { role: "user", content: prompt.value },
                ],
            };
            
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify(promptBody),
            };
            const { response } = await promptToAPI(url, options);
            //const response = "We specialize in woodwind and brass instruments, such as clarinets and trumpets.";
            render(response)
        })
    } catch (error) {
       console.log(error) 
    }
}
main()