function getDate() {
  const date = new Date();
  return {
    date: date.toLocaleDateString(),
    hour: date.toLocaleTimeString()
  };
}

module.exports = getDate;
