browser.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "prev-tab":
      const tabs = await browser.tabs.query({
        currentWindow: true,
        hidden: false,
      });

      if (tabs.length <= 1) return;

      const currentIndex = tabs.findIndex((tab) => tab.active);
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;

      browser.tabs.update(tabs[prevIndex].id, { active: true });
      break;

    case "next-tab":
      const tabs2 = await browser.tabs.query({
        currentWindow: true,
        hidden: false,
      });

      if (tabs2.length <= 1) return;

      const currentIndex2 = tabs2.findIndex((tab) => tab.active);
      const nextIndex =
        currentIndex2 === tabs2.length - 1 ? 0 : currentIndex2 + 1;

      browser.tabs.update(tabs2[nextIndex].id, { active: true });
      break;

    case "new-tab":
      browser.tabs.create({});
      break;

    case "close-tab":
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab) browser.tabs.remove(tab.id);
      break;
  }
});
