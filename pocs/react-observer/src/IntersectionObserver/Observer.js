const defaultOptions = {
  root: null, // element is being intersected
  rootMargin: "0px", // when it will starting considering the intersection
  threshold: 0, // condition to trigger the callback
};

const onObserve = (entries, observer) => {
  //the entries is the array of images
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
