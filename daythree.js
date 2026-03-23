"use strict";

console.log("Hello");

const output = document.getElementById("output");
output.scrollTop = output.scrollHeight
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

function render(response, isBot){
    const p = document.createElement("p");
    if (isBot) {
      p.className =
        "max-w-[75%] mr-auto rounded-lg bg-gray-300 px-2 py-2 text-black";
    } else {
      p.className =
        "max-w[75%] ml-auto rounded-lg bg-blue-600 px-2 py-2 text-white";
    }
    p.textContent = response;
    output.appendChild(p);
}

//Global Variable for the collapsible chatbox AI assistant//
const chatHeader = document.getElementById("chatHeader");
const chatWindow = document.getElementById("chatWindow");

async function main() {
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a sales rep trying to make sales on Clarinets, Saxophones, Drums, Guitars, Trumpets, Trombones, and French Horns. You do not go off topic, you only tell the products or info about what a product is. Never respond with more than 15 words, and never list every single product, perhaps ask a question?",
        },
      ];
      inputArea.addEventListener("submit", async (event) => {
        event.preventDefault();
        const corsURL = "https://corsproxy.io/?url=";
        const workersEndpoint =
          "https://api.cloudflare.com/client/v4/accounts/82bd1d2acadf816a51be4a65b1c64317/ai/run/@cf/meta/llama-3-8b-instruct";
        const url = corsURL + workersEndpoint;
        const key = await getKey();

        messages.push({ role: "user", content: prompt.value });
        const promptBody = {
          message: messages,
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
        messages.push({ role: "assistant", content: response });
        render(prompt.value, false);
        render(response, true);
      });
      //Collapsible chatbox AI Assistant on DOM//
      let isOpen = true;
      chatHeader.addEventListener("click", () => {
        isOpen = !isOpen;

        if (isOpen) {
          chatWindow.classList.remove("max-h-[50px");
          chatWindow.classList.add("max-h-[425px");
        } else {
          chatWindow.classList.add("max-h-[50px");
          chatWindow.classList.remove("max-h-[425px");
        }
      });
    } catch (error) {
       console.log(error) 
    }
}
main()