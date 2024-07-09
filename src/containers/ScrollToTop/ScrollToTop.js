import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScrollToTop() {

  const history = useNavigate()

  //TODO to better maintain the scroll state, we can memoise the page heights (need implementations)
  useEffect(() => {
    const prevent = ['home']
    const canScrollToTop = (path = '') => !prevent.some(p => path.includes(p))
    let clear;
    const unSubscribe = history.listen((location, action) => {
      if (action !== 'POP' && canScrollToTop(location.pathname)) {
        clear = setTimeout(() => window.scrollTo(0, 0), 200)
      }
    })
    return () => {
      try {
        unSubscribe(); clearTimeout(clear);
      } catch (i) { }
    }
  }, [history]);

  return null;
}
