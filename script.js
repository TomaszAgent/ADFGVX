import { cells_generator_helper, number_chars, alphabet } from "./constants.js";

const adfgvxCipher = (text, key, board) => {
  let temp_text = "";
  for (const char of text.replace(/\s+/g, "")) {
    temp_text += board[char.toUpperCase()];
  }

  let temp_obj = {};
  for (let char of key.replace(/\s+/g, "")) {
    while (Object.keys(temp_obj).includes(char)) {
      char += char;
    }
    temp_obj[char] = "";
  }

  const obj_keys = Object.keys(temp_obj);
  let current_key = 0;
  for (const char of temp_text) {
    temp_obj[obj_keys[current_key]] += char;
    current_key = current_key == obj_keys.length - 1 ? 0 : current_key + 1;
  }

  let current_filler = board["X"][0];
  for (const obj_key of obj_keys) {
    if (temp_obj[obj_key].length != temp_obj[obj_keys[0]].length) {
      temp_obj[obj_key] += current_filler;
      current_filler =
        current_filler == board["X"][0] ? board["X"][1] : board["X"][0];
    }
  }

  let result = "";
  for (const obj_key of obj_keys.sort()) {
    result += temp_obj[obj_key];
  }

  return result;
};

const adfgvxDecipher = (text, key, board) => {
  let temp_obj = {};
  let sorted_key = key.split("").sort();
  const column_lenght = text.length / key.length;
  for (const index in sorted_key) {
    let char = sorted_key[index];
    while (Object.keys(temp_obj).includes(char)) {
      char += char;
    }
    temp_obj[char] = text.slice(
      index * column_lenght,
      (+index + 1) * column_lenght
    );
  }

  const temp_key_chars = key.split("");
  let key_chars = [];
  for (let index in temp_key_chars) {
    let char = temp_key_chars[index];
    while (key_chars.includes(char)) {
      char += char;
    }
    key_chars.push(char);
  }

  let temp_text = "";
  let row = 0;
  let column = 0;
  while (temp_text.length != text.length) {
    temp_text += temp_obj[key_chars[column]][row];
    column++;
    if (column == key.length) {
      column = 0;
      row++;
    }
  }

  let result = "";
  for (let i = 0; i < temp_text.length; i += 2) {
    const char = temp_text.slice(i, i + 2);
    result += Object.keys(board).find((board_key) => board[board_key] == char);
  }

  return result;
};

const generate_board = (codeword) => {
  let result = {};
  let row = 0;
  let column = 0;
  for (const char of new Set(codeword.toUpperCase().split(""))) {
    result[char] = cells_generator_helper[row] + cells_generator_helper[column];
    column++;
    if (column == cells_generator_helper.length) {
      column = 0;
      row++;
    }
    if (
      Object.keys(number_chars).includes(char) &&
      !codeword.includes(number_chars[char])
    ) {
      result[number_chars[char]] =
        cells_generator_helper[row] + cells_generator_helper[column];
      column++;
      if (column == cells_generator_helper.length) {
        column = 0;
        row++;
      }
    }
  }
  for (const char of alphabet) {
    if (!Object.keys(result).includes(char)) {
      result[char] =
        cells_generator_helper[row] + cells_generator_helper[column];
      column++;
      if (column == cells_generator_helper.length) {
        column = 0;
        row++;
      }
      if (Object.keys(number_chars).includes(char)) {
        result[number_chars[char]] =
          cells_generator_helper[row] + cells_generator_helper[column];
        column++;
        if (column == cells_generator_helper.length) {
          column = 0;
          row++;
        }
      }
    }
  }

  return result;
};

const handleRequest = (text, codeword, key, operation) => {
  switch (operation) {
    case "cipher":
      return adfgvxCipher(text, key, generate_board(codeword));
    case "decipher":
      return adfgvxDecipher(text, key, generate_board(codeword));
  }
};

export default handleRequest;
