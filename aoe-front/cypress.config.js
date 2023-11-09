const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "papwqi",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
    },
  },
});
