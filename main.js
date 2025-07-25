import { meet } from '@googleworkspace/meet-addons/meet.addons';

const CLOUD_PROJECT_NUMBER = '591603684522'; // Replace with your actual project number
const MAIN_STAGE_URL = 'http://localhost:8080/MainStage.html'; // Update this based on your setup

/**
 * Prepares the add-on Side Panel Client, and adds an event to launch the
 * activity in the main stage when the main button is clicked.
 */
export async function setUpAddon() {
  const session = await meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  const sidePanelClient = await session.createSidePanelClient();
  
  document
    .getElementById('start-activity')
    .addEventListener('click', async () => {
      await sidePanelClient.startActivity({
        mainStageUrl: MAIN_STAGE_URL
      });
    });
}

/**
 * Prepares the add-on Main Stage Client, which signals that the add-on has
 * successfully launched in the main stage.
 */
export async function initializeMainStage() {
  const session = await meet.addon.createAddonSession({
    cloudProjectNumber: CLOUD_PROJECT_NUMBER,
  });
  await session.createMainStageClient();
}