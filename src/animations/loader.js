import gsap from 'gsap';

const loaderAnimation = (homeRef, loadRef, logoRef, firstLoad) => {
    gsap.to(homeRef.current, {
        duration: 0,
        visibility: 'visible',
      });
      if (firstLoad) {
        const tl = gsap.timeline();
        tl.to(logoRef.current, {
          duration: 0,
          fill: '#E50914',
        })
          .from(logoRef.current, {
            duration: 1,
            y: 100,
            skewY: 20,
          })
          .to(loadRef.current, {
            duration: 1,
            ease: 'power3.in',
            delay: 0.5,
            opacity: 0,
          })
          .to(loadRef.current, {
            display: 'none',
          });
      } else return;
}

export default loaderAnimation;