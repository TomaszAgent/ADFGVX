const cells_generator_helper = ["A", "D", "F", "G", "V", "X"];
const number_chars = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 0,
};
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const adfgvxCipher = (text, key, board) => {
  let temp_text = "";
  for (const char of text.replace(/\s+/g, "")) {
    temp_text += board[char.toUpperCase()];
  }

  let temp_obj = {};
  for (const char of key.replace(/\s+/g, "")) {
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
    temp_obj[sorted_key[index]] = text.slice(
      index * column_lenght,
      (+index + 1) * column_lenght
    );
  }

  let temp_text = "";
  let row = 0;
  let column = 0;
  while (temp_text.length != text.length) {
    temp_text += temp_obj[key[column]][row];
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
  for (const char of codeword.toUpperCase()) {
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
