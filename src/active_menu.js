// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
// - 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막을 선택 


const sectionIds = [ '#home', '#about', '#skills', '#work', '#testimonials', '#contact' ]; 
const section = sectionIds.map((id) => document.querySelector(id));
// 보여지는 섹션
const visibleSections = sectionIds.map(()=> false)

const navItems = sectionIds.map((id)=> document.querySelector(`[href="${id}"]`));
// console.log(navItems)

const options = {};
const observer = new IntersectionObserver(observerCallback, options);
section.forEach((section)=> observer.observe(section));

function observerCallback(entries){
    let selectLastOne;
    entries.forEach((entry)=>{
        // console.log(entry.target);
        // console.log(entry.isIntersecting);
        // console.log(entry.isIntersectionRatio);
        console.log('entry.target.id: ', entry.target.id)
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        visibleSections[index] = entry.intersecting;
        selectLastOne = 
            index === sectionIds.length - 1 &&
            entry.intersecting &&
            entry.intersectionRatio >= 0.99;
    });
    console.log('visibleSections: ', visibleSections);
    console.log('selectLastOne: ', selectLastOne);
}

