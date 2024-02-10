let inputField = document.querySelector("input");
let searchButton = document.querySelector(".search-btn");
let resultPlace = document.querySelector(`.result h2 `);
let sort = document.querySelector(`.result .sort `);
let explain = document.querySelector(`.meaning .explaintion `);
let example = document.querySelector(`.meaning .example `);
let audioButton = document.querySelector(".audio ");
let audio = document.querySelector(`.audio audio`);

searchButton.addEventListener("click", () => {
  if (inputField.value == "") {
    Swal.fire({
      title: "empty",
      text: "this is field cannot be empty",
      icon: "error",
    });
  } else {
    getWord(inputField.value);
  }
});
async function getWord(word) {
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let [data] = await response.json();
    console.log(data);
    resultPlace.innerHTML = "";
    resultPlace.innerHTML = data.word;
    sort.innerHTML = "";
    sort.innerHTML = data.meanings[0].partOfSpeech;
    explain.innerHTML = "";
    explain.innerHTML = data.meanings[0].definitions[0].definition;
    example.innerHTML = "";
    example.innerHTML = data.meanings[0].definitions[0].example;
    console.log(example.innerHTML);
    if (!example.innerHTM) {
      example.innerHTML = data.meanings[0].definitions[1].example;
    }
    if (!example.innerHTM) {
      example.innerHTML = data.meanings[0].definitions[2].example;
    }
    audio.src = "";
    audio.src = data.phonetics[0].audio;
    if (!audio.src) {
      audio.src = data.phonetics[1].audio;
    }
  } catch {
    Swal.fire({
      title: "not found",
      text: "this is not defiend word or some data missed(due to API)",
      icon: "error",
    });
  }
}
audioButton.addEventListener("click", () => {
  var audioPlayer = new Audio(`${audio.src}`);
  audioPlayer.play();
});
