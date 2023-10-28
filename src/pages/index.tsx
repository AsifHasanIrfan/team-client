import Home from '@views/Home';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default HomePage;
