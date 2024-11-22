module.exports = {
    transform: {
      "^.+\\.tsx?$": "babel-jest",
      "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)" // Transforms ES modules like axios
    ],
  };
  