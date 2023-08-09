let originalImageURL;
let processedImageURL;

function handleUpload() {
    console.log("clicked");

    const fileInput = document.getElementById('filepicker');
    const image = fileInput.files[0];

    if (!image) {
        console.error("No image selected");
        return;
    }

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append('size', 'auto');

    const apiKey = "cTeY8gJ6unCXhV2DYFd6mZzb"; //apikey from remove.bg api
    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to process image');
            }
            return response.blob();
        })
        .then(function (blob) {
            const originalURL = URL.createObjectURL(image);
            const processedURL = URL.createObjectURL(blob);
            originalImageURL = originalURL;
            processedImageURL = processedURL;

            const originalImage = document.createElement('img');
            originalImage.src = originalURL;

            const processedImage = document.createElement('img');
            processedImage.src = processedURL;

            const originalContainer = document.getElementById('originalContainer');
            const processedContainer = document.getElementById('processedContainer');

            originalContainer.innerHTML = '';
            processedContainer.innerHTML = '';

            const originalLabel = document.createElement('p');

            originalLabel.textContent = 'Original Image';
            originalContainer.appendChild(originalLabel);
            originalContainer.appendChild(originalImage);

            const processedLabel = document.createElement('p');
            processedLabel.textContent = 'Processed Image';
            processedContainer.appendChild(processedLabel);
            processedContainer.appendChild(processedImage);

        })
        .catch(function (error) {
            console.error(error);
        });
}
//download file function
function downloadFile() {
    if (!processedImageURL) {
        console.error("No processed image available");
        return;
    }

    const anchorElement = document.createElement('a');
    anchorElement.href = processedImageURL;
    anchorElement.download = 'no-bg.png';

    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);

    URL.revokeObjectURL(processedImageURL); // Release the URL object
}