const { nanoid } = require("nanoid");
const shortId = {
  type: String,
  default: () => {
    return nanoid(4);
  },
  require: true,
  index: true,
};

module.exports = shortId;
