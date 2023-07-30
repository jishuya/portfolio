// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.

// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택 → findFirstIntersecting()
// - 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막을 선택 →  selectLastOne

// 해당 메뉴아이템 활성화 : selectNavItem()


const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonial',
    '#contact',
  ];
  // 실제 section
  const sections = sectionIds.map((id) => document.querySelector(id));
  // 실제 nav
  const navItems = sectionIds.map((id) => document.querySelector(`[href="${id}"]`));
  // 현재 섹션들의 관찰여부 (true, false)
  const visibleSections = sectionIds.map(() => false);
  // 현재 활성화된 nav
  let activeNavItem = navItems[0];
  
  const options = {
    rootMargin: '-30% 0px 0px 0px',
    threshold: [0, 0.98],
  };
  const observer = new IntersectionObserver(observerCallback, options);
  sections.forEach((section) => observer.observe(section));
  
  function observerCallback(entries) {
    let selectLastOne;
    entries.forEach((entry) => {
      // 현재 보여지고 있는 섹션의 index 찾기
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      visibleSections[index] = entry.isIntersecting;
      selectLastOne =
        index === sectionIds.length - 1 &&
        entry.isIntersecting &&
        entry.intersectionRatio >= 0.95;
    });
  
    // navIndex: 현재 관찰중인 section으로 인덱스 찾기
    const navIndex = selectLastOne
      ? sectionIds.length - 1
      : findFirstIntersecting(visibleSections);

    selectNavItem(navIndex);
  }
  
  
// visibleSections 중에서 첫번째로 true인 것의 index 반환
  function findFirstIntersecting(intersections) {
    console.log('intersections: ', intersections)
    const index = intersections.indexOf(true);
    return index >= 0 ? index : 0;
  }
  
  // 현재관찰 중인 section의 navIndx 스타일링
  function selectNavItem(index) {
    const navItem = navItems[index];
    if (!navItem) return;
    activeNavItem.classList.remove('active');
    activeNavItem = navItem;
    activeNavItem.classList.add('active');
  }
  
