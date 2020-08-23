const core = require("@actions/core");
const fetch = require("node-fetch");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const TELEGRAM_BOT_ID = core.getInput("TELEGRAM_BOT_ID");
    const TELEGRAM_CHAT_ID = core.getInput("TELEGRAM_CHAT_ID");
    const CUSTOMMESSAGE =
      core.getInput("CUSTOMMESSAGE") || "Successfully Completed Github Action";
    const STATUS = core.getInput("STATUS") || true;
    //${{ job.status }}
    const JOBSTATUS = core.getInput("JOBSTATUS") || false;

    // : "${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}"}]
    const GITHUB_RUN_NUMBER = core.getInput("GITHUB_RUN_NUMBER") || 0;
    const GITHUB_REPOSITORY = core.getInput("GITHUB_REPOSITORY") || "";
    const GITHUB_RUN_ID = core.getInput("GITHUB_RUN_ID") || 0;
    const GITHUB_ACTOR = core.getInput("GITHUB_ACTOR") || "";
    const GITHUB_EVENT_NAME = core.getInput("GITHUB_EVENT_NAME") || "";
    const GITHUB_SHA = core.getInput("GITHUB_SHA") || 0;

    let msg =
      STATUS === "true"
        ? `${CUSTOMMESSAGE} \xE2\x9C\x85 \n${
            JOBSTATUS ? "Job status : " + JOBSTATUS + "\n" : ""
          } ${
            GITHUB_RUN_NUMBER
              ? "GitHub Run Number : " + GITHUB_RUN_NUMBER + "\n"
              : ""
          } ${
            GITHUB_REPOSITORY
              ? "GitHub Repository : " + GITHUB_REPOSITORY + "\n"
              : ""
          }  
          ${GITHUB_RUN_ID ? "GitHub Run ID : " + GITHUB_RUN_ID + "\n" : ""}  
          ${GITHUB_ACTOR ? "Triggered user : " + GITHUB_ACTOR + "\n" : ""} 
          ${
            GITHUB_EVENT_NAME
              ? "Triggered event : " + GITHUB_EVENT_NAME + "\n"
              : ""
          } 
          ${GITHUB_SHA ? "GitHub commit SHA : " + GITHUB_SHA + "\n" : ""} 

          `
        : ` ${CUSTOMMESSAGE}  " \xE2\x9D\x8C  \n${
            JOBSTATUS ? "Job status : " + JOBSTATUS + "\n" : ""
          } ${
            GITHUB_RUN_NUMBER
              ? "GitHub Run Number : " + GITHUB_RUN_NUMBER + "\n"
              : ""
          } ${
            GITHUB_REPOSITORY
              ? "GitHub Repository : " + GITHUB_REPOSITORY + "\n"
              : ""
          } 
        ${GITHUB_RUN_ID ? "GitHub Run ID : " + GITHUB_RUN_ID + "\n" : ""}  
        ${GITHUB_ACTOR ? "Triggered user : " + GITHUB_ACTOR + "\n" : ""} 
        ${
          GITHUB_EVENT_NAME
            ? "Triggered event : " + GITHUB_EVENT_NAME + "\n"
            : ""
        } 
        ${GITHUB_SHA ? "GitHub commit SHA : " + GITHUB_SHA + "\n" : ""} 
`;

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
