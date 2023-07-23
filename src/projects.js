
'use strict';


const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');

categories.addEventListener('click', (event)=>{
    const filter = event.target.dataset.category;
 
    if(filter === null){
        return;
    }
    // Active 메뉴를 재설정
    const active = document.querySelector('.category--selected');
    active.classList.remove('category--selected'); //classList쓸 때는 . # 이런거 꼭 빼야함
    event.target.classList.add('category--selected');
    
    // 프로젝트 필터링 관련 로직 처리
    projectsContainer.classList.add('anim-out')
    projects.forEach((project) => {
      if (filter === 'all' || filter === project.dataset.type) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
    setTimeout(()=>{
      console.log(5555)
      projectsContainer.classList.remove('anim-out')
    }, 250)


 
})