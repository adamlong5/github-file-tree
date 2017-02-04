chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if (details.url && details.url.match(/\/pull\/[0-9]+\/files(#[\S]+)?(\?[\S]+)?$/)) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log('sending message')
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response)
      });
    });
  }
});
