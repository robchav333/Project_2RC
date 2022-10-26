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
  analyser.fftSize = 1024 ;
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
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 2048;
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

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(i * Math.PI * 10 / bufferLength);
    const hue = i * 2;
    ctx.fillStyle = 'hsl(' + hue + ', 100%,'+ barHeight/3 + '%)';
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }



}


audioPlayer();
function audioPlayer(){
  var currentSong = 0;
  $("#audioPlayer")[0].src = $("playlist li a")[0];
  $("#playlist li a").click(function(e){
    e.preventDefault();
    $("audioPlayer")[0].src = this;
    $("audioPlayer")[0].play();
  })
}
