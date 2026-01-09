const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 80) });
const processData = [
  { num: '01', title: 'Discover', desc: 'We immerse ourselves in your business through workshops, stakeholder interviews, and competitive analysis. Understanding precedes design.' },
  { num: '02', title: 'strategise', desc: 'Research becomes direction. We define information architecture, content strategy, and visual approach before any design work begins.' },
  { num: '03', title: 'Design', desc: 'Strategy transforms into high-fidelity designs. Iterative feedback ensures alignment at every stage from wireframes to final visuals.' },
  { num: '04', title: 'Develop', desc: 'Clean code, optimized performance, accessibility baked in. We build on modern platforms with your growth in mind.' },
  { num: '05', title: 'Launch', desc: 'Coordinated deployment, thorough QA, and post-launch monitoring. We ensure everything performs perfectly in production.' }
];
const steps = document.querySelectorAll('.process-step');
const detailNum = document.getElementById('detail-num');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
steps.forEach((step, i) => {
  step.addEventListener('click', () => {
    steps.forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    const d = processData[i];
    detailNum.textContent = d.num;
    detailTitle.textContent = d.title;
    detailDesc.textContent = d.desc;
  });
});
