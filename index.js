import handleRequest from "./script";

const textInput = document.querySelector('input[name="text"]');
const keywordInput = document.querySelector('input[name="keyword"]');
const codewordInput = document.querySelector('input[name="codeword"]');
const resultInput = document.querySelector('input[name="result"]');
const cipherButton = document.querySelector('button[name="cipher"]');
const decipherButton = document.querySelector('button[name="decipher"]');

const handleCipherButtonClick = (event) => {
  event.preventDefault();
  const text = textInput.textContent;
  const keyword = keywordInput.textContent;
  const codeword = codewordInput.textContent;
  const result = handleRequest(text, codeword, keyword, "cipher");
  resultInput.textContent = result;
};

const handleDecipherButtonClick = (event) => {
  event.preventDefault();
  const text = textInput.textContent;
  const keyword = keywordInput.textContent;
  const codeword = codewordInput.textContent;
  if (text.length % keyword.length != 0) {
    window.alert("enter correct text");
    return;
  }
  const result = handleRequest(text, codeword, keyword, "decipher");
  resultInput.textContent = result;
};

cipherButton.addEventListener("onclick", handleCipherButtonClick);
decipherButton.addEventListener("onclick", handleDecipherButtonClick);
