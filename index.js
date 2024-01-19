import handleRequest from "./script.js";
import { cells_generator_helper } from "./constants.js";

const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str.replace(/\s+/g, ""));

const textInput = document.querySelector('textarea[name="text"]');
const keywordInput = document.querySelector('input[name="keyword"]');
const codewordInput = document.querySelector('input[name="codeword"]');
const resultInput = document.querySelector('textarea[name="result"]');
const cipherButton = document.querySelector('button[name="cipher"]');
const decipherButton = document.querySelector('button[name="decipher"]');

const handleCipherButtonClick = (event) => {
  event.preventDefault();
  const text = textInput.value;
  const keyword = keywordInput.value;
  const codeword = codewordInput.value;

  if (!isAlphanumeric(text)) {
    window.alert("enter correct text");
  }
  if (codeword !== "" && !isAlphanumeric(codeword)) {
    window.alert("enter correct codeword");
    return;
  }
  if (keyword === "") {
    window.alert("enter keyword");
  }

  const result = handleRequest(text, codeword, keyword, "cipher");
  resultInput.value = result;
};

const handleDecipherButtonClick = (event) => {
  event.preventDefault();
  const text = textInput.value;
  const keyword = keywordInput.value;
  const codeword = codewordInput.value;

  if (
    text.length % keyword.length != 0 ||
    !text.split("").every((char) => cells_generator_helper.includes(char))
  ) {
    window.alert("enter correct text");
    return;
  }
  if (codeword !== "" && !isAlphanumeric(codeword)) {
    window.alert("enter correct codeword");
    return;
  }
  if (keyword === "") {
    window.alert("enter keyword");
  }

  const result = handleRequest(text, codeword, keyword, "decipher");
  resultInput.value = result;
};

cipherButton.addEventListener("click", handleCipherButtonClick);
decipherButton.addEventListener("click", handleDecipherButtonClick);
