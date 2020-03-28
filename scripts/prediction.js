let model;
let videoWidth;
let videoHeight;
let fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};


console.log(brain);

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 500;


const landmarksRealTime = async (video) => {
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;
  const canvas = document.getElementById('output');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  const frameLandmarks = async () => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const result = predictions[0].landmarks;
      drawKeypoints(ctx, result, predictions[0].annotations);

      console.log({ result });
    }

    requestAnimationFrame(frameLandmarks);
  };

  frameLandmarks();
};
