'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  if (active != null) {
    active.classList.remove('selected');
  }
  e.target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// Intersection Observer API는 브라우저에서 뷰포트 내에서 요소들이 교차되는지를 감지하는 기능을 제공
// Intersection Observer API의 콜백 함수에는 두 개의 매개변수(entries와 observer)가 전달됩니다. 
// entries 매개변수는 관찰 중인 요소들에 대한 정보를 담은 배열입니다. 배열의 각 요소는 관찰 중인 하나의 요소에 대한 정보를 담고 있습니다. 
// observer 매개변수는 IntersectionObserver 객체 자체를 참조합니다.

// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials', 
  '#contact',
];

// section의 dom 요소 가져오기 ex) id="navbar"
const sections = sectionIds.map((id) => document.querySelector(id));
// ex) navbar__menu의 dom요소 가져오기 data-link="#home"
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];  // data-link="#home"
function selectNavItem(selected) {
  console.log('selectedNavItem1: ', selectedNavItem)
  console.log('navItems[selectedNavIndex]: ', selected)
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
  console.log('selectedNavItem2: ', selectedNavItem)
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // 빠져나갈때: 관찰중이 요소가 뷰포트내에 보임 
    // && 관찰 중인 요소가 뷰포트 내에서 전혀안보이는것 뺴고 - 페이지만들어지고 나간것들이 걸려
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      console.log('y');
      // ex) skills index = 2
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라올 때, 다음인덱스 = 기존인덱스 + 1
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      // 스크롤링이 위로 되어서 페이지가 올라올 때, 다음인덱스 = 기존인덱스 + 1
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    // (0.0) + 현재 윈도우창 높이  === documentPage 전체높이
    window.scrollY + window.innerHeight === document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  // navbar__menu의 dom요소 navItems[1] = data-link="#about"
  selectNavItem(navItems[selectedNavIndex]);
});
