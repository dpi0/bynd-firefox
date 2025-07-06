browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case "prev-tab":
      browser.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length <= 1) return;

        const currentIndex = tabs.findIndex((tab) => tab.active);
        const prevIndex =
          currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;

        browser.tabs.update(tabs[prevIndex].id, { active: true });
      });
      break;

    case "next-tab":
      browser.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length <= 1) return;

        const currentIndex = tabs.findIndex((tab) => tab.active);
        const nextIndex =
          currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;

        browser.tabs.update(tabs[nextIndex].id, { active: true });
      });
      break;

    case "new-tab":
      browser.tabs.create({});
      break;

    case "close-tab":
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          browser.tabs.remove(tabs[0].id);
        }
      });
      break;
  }
});
