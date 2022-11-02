const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;




container.addEventListener('click', function() {
  const audio1 = document.getElementById('audio1');
  audio1.src = 'data:audio/x-wav;base64';
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  // frequency
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);

  }
  animate();
});

file.addEventListener('change', function() {
  const files = this.files;
  const audio1 = document.getElementById('audio1');
  audio1.src = file.options[file.selectedIndex].value;
  audio1.load();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  // frequency
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x;


  function animate() {

    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);

  }
  animate();

});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){
  for (let i = 0; i < bufferLength; i++){
    barHeight = dataArray[i] * 1.4;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * bufferLength * 4);
    const hue = 250 + i * 2;
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.beginPath();
    ctx.arc(0, barHeight, barHeight/10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, barHeight, barHeight/20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, barHeight, barHeight/30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, barHeight,  barHeight/40, 0, Math.PI * 2);
    ctx.fill();
    x += barWidth;
    ctx.restore();
  }





}
