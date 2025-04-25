// Function to open the camera
function openCamera() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('cameraSection').style.display = 'flex';
    
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const message = document.getElementById('message');

    // Request access to the webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                alert("Error accessing webcam: " + error);
            });
    }
}

// Function to take the photo
function takePhoto() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const message = document.getElementById('message');

    // Draw the current frame from the video to the canvas
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Hide the video and show the photo
    video.style.display = 'none';
    canvas.style.display = 'block';

    // Show the message
    message.style.display = 'block';
}

// Function to go back to the dashboard
function goBackToDashboard() {
    document.getElementById('cameraSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';

    // Stop the video stream when leaving the camera section
    const video = document.getElementById('video');
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
}
