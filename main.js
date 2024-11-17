let imageURL;

function handleUpload() {
    const fileInput = document.getElementById('filepicker');
    const image = fileInput.files[0];
    
    if (!image) {
        alert("Please select a file before uploading.");
        return;
    }

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    const apiKey = "EWSy7LZHkbGH6GGfZm1j83Rw"; // Replace with your actual remove.bg API key

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-API-Key': apiKey },
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        imageURL = url;

        const imgTag = document.getElementById('img');
        imgTag.src = url;
        imgTag.alt = "Processed Image";
    })
    .catch(error => {
        console.error("Error uploading image:", error);
        alert("Failed to process the image. Please try again.");
    });
}

function downloadFile() {
    if (!imageURL) {
        alert("No file to download. Please upload and process an image first.");
        return;
    }

    const anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'no-bg.png';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
}

function refreshPage() {
    location.reload();
}