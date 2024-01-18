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

const test_board = {
  B: "AA",
  T: "AD",
  A: "AF",
  L: "AG",
  P: "AX",
  D: "DA",
  H: "DD",
  O: "DF",
  Z: "DG",
  K: "DX",
  Q: "FA",
  F: "FD",
  V: "FF",
  S: "FG",
  N: "FX",
  G: "GA",
  J: "GD",
  I: "GD",
  C: "GF",
  U: "GG",
  X: "GX",
  M: "XA",
  R: "XD",
  E: "XF",
  W: "XG",
  Y: "XX",
};

console.log(adfgvxCipher("Tajna wiadomosc", "haslo", test_board));
