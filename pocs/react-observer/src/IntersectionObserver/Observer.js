const defaultOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const onObserve = (entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      console.log("component on screen", target);
      target.src = target.dataset.src;
      observer.unobserve(target);
    }
  });
};

export default new IntersectionObserver(onObserve, defaultOptions);
