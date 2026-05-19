document.querySelector('#app').innerHTML = `
    <img id="logo" class="logo">
      <div class="result" id="result">Please enter your name below 👇</div>
      <div class="result" id="result2">Please enter your other name below 👇</div>
      <div class="input-box" id="input">
        <input class="input" id="name" type="text" autocomplete="off" />
        <button class="btn" onclick="greet()">Greet</button>
      </div>
      <div class="input-box" id="input2">
        <input class="input" id="name2" type="text" autocomplete="off" />
        <button class="btn" onclick="greet2()">Greet2</button>
      </div>
    </div>
`;
import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import {Greet, Greet2} from '../wailsjs/go/main/App';

document.getElementById('logo').src = logo;

let nameElement = document.getElementById("name");
let name2Element = document.getElementById("name2");
nameElement.focus();
let resultElement = document.getElementById("result");
let result2Element = document.getElementById("result2");

// Setup the greet function
window.greet = function () {
    // Get name
    let name = nameElement.value;
    let name2 = name2Element.value;

    // Check if the input is empty
    if (name === "") return;

    // Call App.Greet(name)
    try {
        Greet(name)
            .then((result) => {
                // Update result with data back from App.Greet()
                resultElement.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });

            Greet2(name2)
            .then((result) => {
                // Update result with data back from App.Greet2()
                result2Element.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};
