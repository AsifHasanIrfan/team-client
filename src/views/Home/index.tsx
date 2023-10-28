import Career from './components/Career';
import Clients from './components/Clients';
import FutureWork from './components/FutureWork';
import Hero from './components/Hero';
import InclusiveEnvironment from './components/InclusiveEnvironment';
import OurCoreValues from './components/OurCoreValues';

const Home: React.FC = () => {
  return (
    <div className="bg-[#F7F8FA]">
      <Hero />
      <FutureWork />
      <OurCoreValues />
      {/* <InclusiveEnvironment /> */}
      <Career />
      <Clients />
    </div>
  );
};

export default Home;
