const recordRockGesture = () => {
  recordingRock = true;
}


const recordPaperGesture = () => {
  recordingPaper = true;
}


const recordScissorsGesture = () => {
  recordingScissors = true;
}


const showData = () => {
  console.log({
    rockData,
    paperData,
    scissorsData,
  });
}


const trainNetwork = async () => {
  console.log('Started network training');
  const networkTrainData = [];

  for (let i = 0; i < rockData.length; i++) {
    const proportions = getProportionsLimited(rockData[i]);
    networkTrainData.push({
      input: proportions, output: [0],
    });
  }


  for (let i = 0; i < paperData.length; i++) {
    const proportions = getProportions(paperData[i]);
    networkTrainData.push({
      input: proportions, output: [1],
    });
  }

  for (let i = 0; i < scissorsData.length; i++) {
    const proportions = getProportions(scissorsData[i]);
    networkTrainData.push({
      input: proportions, output: [2],
    });
  }

  await net.train(networkTrainData, {
    log: true,
    errorThresh: 0.001,
    learningRate: 0.01,
    iterations: 100000,
  });
}


const recognizeGesture = () => {

}
