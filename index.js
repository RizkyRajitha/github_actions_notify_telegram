const core = require("@actions/core");
const fetch = require("node-fetch");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput("milliseconds");

    
    const TELEGRAM_BOT_ID = core.getInput("TELEGRAM_BOT_ID");
    const TELEGRAM_CHAT_ID = core.getInput("TELEGRAM_CHAT_ID");
    const status = core.getInput("STATUS");


    core.debug(ms);
 

    let msg = status
      ? "GitHub actions successfully completed " + "\xE2\x9C\x85"
      : "GitHub actions Failed " + "\xE2\x9D\x8C";

    let data = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_ID}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${msg}`,
      {
        method: "POST",
      }
    ).then((response) => response.json());

    if (data.ok) {
      core.debug("success ✅");
    } else {
      core.debug("failed 🔴");
      core.setFailed(data.description);
    }
  } catch (error) {
    core.debug("failed 🔴");
    core.debug(error);
    core.setFailed(error.message);
  }
}

run();
