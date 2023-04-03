const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // implement node event listeners here
      return config;
    },
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
    pageLoadTimeout: 120000,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  viewportWidth: 1536,
  viewportHeight: 960,
});
