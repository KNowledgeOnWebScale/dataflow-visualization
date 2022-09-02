import {useEffect} from "react";

// A debounce function is a function that will be triggered if it hasn't been called for a certain time
// https://www.freecodecamp.org/news/javascript-debounce-example/
const useDebouncedEffect = (effect, deps, delay) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps || []), delay]);
};

export default useDebouncedEffect;
