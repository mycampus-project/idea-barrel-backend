const statusMsg = (status, body) => {
  return {
    status,
    body,
  };
};

const missingDataStr = "senderId, category, title or body missing";

module.exports = { statusMsg, missingDataStr };
