const inputText = document.querySelector("#input_text");
const button = document.querySelector("#add_button");
const ul = document.querySelector("#ul_list");

button.disabled = true;

let tweetsArray = [];

const loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    inputText.addEventListener("input", validateText);
    button.addEventListener("click", sendInfo);
    tweetsArray = JSON.parse(localStorage.getItem("tweets")) || [];

    createTweet();
  });
};

const validateText = () => {
  inputText.value === "" ? (button.disabled = true) : (button.disabled = false);
  if (inputText.value.length > 28) {
    button.disabled = true;
    button.textContent = "Maximum 28 characters";
    button.classList.add("maxChar");
  } else {
    button.classList.remove("maxChar");
    button.disabled = false;
    button.textContent = "Add";
  }
};

const sendInfo = (e) => {
  e.preventDefault();

  const year = moment().set("year", 1998).format("l");

  const finishValue = inputText.value;

  const tweetObj = {
    id: Date.now(),
    texto: finishValue,
    dia: year,
  };

  tweetsArray.push(tweetObj);

  createTweet();
};

const createTweet = () => {
  clear();

  if (tweetsArray.length > 0) {
    tweetsArray.forEach((element) => {
      const test = document.createElement("div");
      const list = document.createElement("p");
      const removeButton = document.createElement("button");

      list.innerHTML = `${element.dia} - ${element.texto}`;

      removeButton.innerHTML = "remove";
      removeButton.onclick = () => {
        removeTweet(element.id);
      };

      test.appendChild(list);
      test.appendChild(removeButton);
      ul.appendChild(test);
    });
  }

  localStorage.setItem("tweets", JSON.stringify(tweetsArray));
};

const clear = () => {
  ul.innerHTML = "";
};

const removeTweet = (idTweet) => {
  tweetsArray = tweetsArray.filter((tweet) => tweet.id !== idTweet);
  console.log(tweetsArray);
  createTweet();
};

loadEventListeners();
