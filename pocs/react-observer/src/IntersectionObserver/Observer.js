const defaultOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const onObserve = (entries, observer) => {
  //the entries are being observed
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      //takes action for each element being intersected
      console.log("component on screen", target);
      target.src = target.dataset.src;
      observer.unobserve(target); // here I unobserve the item once alredy in the screen
    }
  });
};

//here we have the instantiation of our intersection observer where we have pass two values
export default new IntersectionObserver(onObserve, defaultOptions);
