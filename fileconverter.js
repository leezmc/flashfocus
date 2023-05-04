const fileInput = document.getElementById('fileInput');
const downloadLink = document.getElementById('downloadLink');

function convertFile() {
  const outputFormat = document.getElementById('outputFormat').value;
  
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('outputFormat', outputFormat);
  
  fetch('/convert', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.blob();
  })
  .then(blob => {
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `converted.${outputFormat}`;
    downloadLink.textContent = `Download converted.${outputFormat}`;
  })
  .catch(error => {
    console.error('There was a problem with the network request:', error);
  });
}
