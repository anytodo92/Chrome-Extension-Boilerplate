chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.type == "INIT") {
    sendResponse("ok");
  } else if (request.type == "get_assistance") {
    try {
      const res = await fetch(
        "http://192.168.136.161:8888/li/trigger",
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          }, 
          body: JSON.stringify({chat: transcriptList})
        }
      );

      const json = await res.json();
      chrome.tabs.sendMessage(sender.tab.id, {
        type: "get_assistance_response",
        data: {
          text: JSON.stringify(json)
        }
      });
    } catch (e) {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: "get_assistance_response",
        data: {
          text: "error!"
        }
      });
    }
  }
});