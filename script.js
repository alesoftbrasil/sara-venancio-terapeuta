const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.querySelector('.dots');
let index = 0;
let timer;

function drawDots(){
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    if(i === 0) b.classList.add('active');
    b.addEventListener('click', () => show(i));
    dotsWrap.appendChild(b);
  });
}
function show(i){
  slides[index].classList.remove('active');
  dotsWrap.children[index].classList.remove('active');
  index = (i + slides.length) % slides.length;
  slides[index].classList.add('active');
  dotsWrap.children[index].classList.add('active');
  clearInterval(timer);
  timer = setInterval(() => show(index + 1), 4500);
}

document.querySelector('.next')?.addEventListener('click', () => show(index + 1));
document.querySelector('.prev')?.addEventListener('click', () => show(index - 1));
drawDots();
timer = setInterval(() => show(index + 1), 4500);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
