// Canvas Setup
const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/90) * (canvas.width/90)
}

window.addEventListener('mousemove',
    function(event){
      mouse.x = event.x;
      mouse.y = event.y;
    }
);

// create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  // method to draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = ' rgba(172, 171, 171, 0.445) '; 
    ctx.fill();
  }
  // check particle position, check mouse position, move the particle, draw the particle
  update() {
    // check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0 ) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0 ) {
      this.directionY = -this.directionY;
    }
    // check collision detection - mouse position / particle position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);    
    if (distance < mouse.radius + this.size){
      if (mouse.x < this.x && this.x < canvas.width - this.size * 30) {
        this.x += 30;
      }
      if (mouse.x > this.x && this.x > this.size * 30){
        this.x -= 30;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 30){
        this.y += 30;
      }
      if (mouse.y > this.y && this.y > this.size * 30){
        this.y -= 30;
      }
    }
    // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    // draw particle
    this.draw();
  }

}
// create particle array
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 6000;
  for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 3) + 1;
      let x = (Math.random() * ((innerWidth - size * 1) - (size * 1)) + size * 1);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 5) - 1;
      let directionY = (Math.random() * 5) - 1;
      let color = ' rgba(172, 171, 171, 0.445) ';

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
// check if particles are close enought to draw line beetwen them
function connect(){
  let opacityValue = 0.1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
      + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      if (distance < (canvas.width/7) * (canvas.height/7)) {
          opacityValue = 0.2 - (distance/80000);
          ctx.strokeStyle='rgb(172, 171, 271,' + opacityValue + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
      }
    }
  }
}


// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

// resize event
window.addEventListener('resize',
    function(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      mouse.radius = ((canvas.width/30) * (canvas.height/30));
      init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();











// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    // Set AM or PM
    
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
  
}

// Add Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if(hour < 12) {
    // morning
    
    greeting.textContent = 'Wilujeng Enjing';
  } else if(hour < 18) {
    // affternoon
    
    greeting.textContent = 'Wilujeng Sonten';
  } else {
    // evening
    
    greeting.textContent = 'Wilujeng Wengi';
    document.body.style.color = 'white';
  }
}
// Get Name
function getName() {
  if(localStorage.getItem('name') === null) {
    name.textContent = '[ Lebetkeun Nami ]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if(e.type === 'keypress') {
    // make sure enter is pressed
    if(e.which == 13 || e.keycode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}
// Set focus
function setFocus(e) {
  if(e.type === 'keypress') {
    // make sure enter is pressed
    if(e.which == 13 || e.keycode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}
// Get Focus
function getFocus() {
  if(localStorage.getItem('focus') === null) {
    focus.textContent = '[ Enter Focus ]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
// getName();
getFocus();
setName(e);




