import { meet } from '@googleworkspace/meet-addons/meet.addons';

const CLOUD_PROJECT_NUMBER = 'YOUR_PROJECT_NUMBER'; // Replace with your actual project number
const MAIN_STAGE_URL = 'https://ceyxasm.github.io/meet-add-on-dummy/MainStage.html';

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

  // Add getUserMedia test
  document
    .getElementById('test-audio')
    .addEventListener('click', async () => {
      const resultDiv = document.getElementById('audio-result');
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = 'Attempting to access microphone...';
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true, 
          video: false 
        });
        resultDiv.innerHTML = `
          <strong>SUCCESS:</strong> Got audio stream!<br>
          Stream ID: ${stream.id}<br>
          Audio tracks: ${stream.getAudioTracks().length}<br>
          Track label: ${stream.getAudioTracks()[0]?.label || 'No label'}
        `;
        resultDiv.style.background = '#d4edda';
        
        // Stop the stream after testing
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        resultDiv.innerHTML = `
          <strong>ERROR:</strong><br>
          Name: ${error.name}<br>
          Message: ${error.message}<br>
          Stack: ${error.stack}
        `;
        resultDiv.style.background = '#f8d7da';
      }
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
