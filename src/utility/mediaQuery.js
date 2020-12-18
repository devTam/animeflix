const mediaQuery = (setSlideCount, setShowBtn) => {
  if (window.innerWidth <= 1200) {
    setSlideCount(6);
  } else return;
  if (window.innerWidth <= 992) {
    setSlideCount(5);
  } else return;
  if (window.innerWidth <= 768) {
    setSlideCount(4);
    console.log(768);
  } else return;
  if (window.innerWidth <= 578) {
    setSlideCount(3);
    setShowBtn(false);
  } else return;
  if (window.innerWidth <= 380) {
    setSlideCount(2);
  } else return;
};

export default mediaQuery;
