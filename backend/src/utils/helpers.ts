const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function hashString(myString: string) {
  const hashedString = await bcrypt.hash(myString, saltRounds);
  return hashedString;
}

hashString("my secret string")
  .then((result) => {
    console.log("Hashed string:", result);
  })
  .catch((err) => {
    console.error(err);
  });

export async function verifyString(myString: string, hashedString: string) {
  const match = await bcrypt.compare(myString, hashedString);
  return match;
}

const hashedString =
  "$2b$10$qWgO/f7kgLTuc5X5z5E5/OIc5zK0lZGt88xJtqHUTThmGYQg1euXm";
verifyString("my secret string", hashedString)
  .then((result) => {
    if (result) {
      console.log("Strings match.");
    } else {
      console.log("Strings do not match.");
    }
  })
  .catch((err) => {
    console.error(err);
  });


/**
  * @Description - Encodes database credential parameter to base 64.
  * @param {string} - Database credential paramater e.g. database username, email, or cluster.
  * @returns {string} - base 64 equivalent of the string passed.
  */
export const base64Encode = (dbParameter: string) => {
  const base64EncodedString = Buffer.from(dbParameter).toString("base64");
  return base64EncodedString;
}

/**
  * @Description - Decodes database credential parameter from base 64.
  * @param {string} - Encoded string e.g. database username, email, or cluster.
  * @returns {string} - string equivalent of the encoded string passed.
  */
export const base64Decode = (base64EncodedString: string) => {
  const decodedString = Buffer.from(base64EncodedString, "base64").toString();
  return decodedString;
}