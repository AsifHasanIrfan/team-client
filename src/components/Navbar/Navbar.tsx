import SiteLogo from '@components/SiteLogo';
import { cx, homeNavData } from '@config/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useAppSelector } from '@hooks/useRedux';
import ButtonSignIn from '@components/ButtonSignIn';

// export const TimeLine1 = gsap.timeline();

function Navbar() {

  const router = useRouter();
  // global states
  const { auth } = useAppSelector(state => state);

  // states
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    gsap.timeline().to('.__dekstopNavGsap', {
      duration: 0.4,
      opacity: 1,
      y: 0,
    });
    // .to('.__navItemGsap', { y: 0, stagger: 0.1, duration: 0.4, opacity: 1 })
    // .to('.__navButtonGsap', { scale: 1, duration: 0.4, opacity: 1 }, '-=0.4');
  }, []);

  return (
    <nav className="__dekstopNavGsap -translate-y-10 opacity-0 fixed z-[999] top-0 left-0 ease-in bg-secondary w-full h-[60px] md:h-[85px] lg:h-[100px]">
      {/* Navbar */}
      <div className="flex flex-row items-center justify-between w-screen">
        <div className="mx-[60px] sm:mx-[60px] md:mx-[75px] xl:mx-[150px] my-[13px] sm:-my[15px] lg:my-[23px] xl:my-[30px]">
          <SiteLogo />
        </div>
        <div className="flex-row items-center justify-center hidden md:flex">
          <div className="md:mr-[30px] lg:mr-[120px] xl:mr-[120px]">
            <ul className="flex flex-row items-center justify-center">
              {homeNavData.map(({ label, path }, i) => (
                <Link href={`${path}`} key={i}>
                  <li className="mx-[15px]">
                    <a className={`text-white cursor-pointer sm:text-sm lg:text-base hover:text-lightHover ${router.route === path && 'text-lightHover'}`}>
                      {label}
                    </a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            {!auth.token ? <ButtonSignIn title={`Sign in`} href={'/login'} /> : <ButtonSignIn title={`Dashboard`} href={'/dashboard'} />}
            {/* <ButtonSignIn /> */}
          </div>
        </div>

        <div onClick={handleNav} className="mr-[47px] sm:mr-[47px] md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[37px] cursor-pointer w-[37px] fill-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`
          w-full bg-[#263238] md:opacity-100  md:hidden duration-150 md:relative flex flex-col fixed top-0 left-0 h-screen __dashboardSideBarScrollBar z-[99999]
          ${nav
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="flex justify-between p-[20px]">

          <div onClick={handleNav} >
            <SiteLogo />
          </div>

          <div onClick={handleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 cursor-pointer stroke-white transition-all hover:stroke-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div className="py-[44px]">
          <ul className="flex flex-col items-start justify-center">
            {homeNavData.map(({ label, path }, i) => (
              <Link href={`${path}`} key={i}>
                <li className="w-full cursor-pointer" onClick={handleNav}>
                  <a
                    style={{
                      background:
                        router.route === path
                          ? 'linear-gradient(90deg, #C10206 0%, rgba(255, 8, 57, 0) 100%)'
                          : undefined,
                    }}
                    className={cx(
                      router.route === path && 'cursor-pointer',
                      'flex items-center md:justify-center home_nav_hover  lg:justify-start gap-2.5 md:gap-[15px] pl-[21px] py-[17px] text-white md:text-xl duration-100 relative'
                    )}
                  >
                    {label}
                  </a>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {!auth.token ? <div className="absolute mx-[27px] bottom-[47px] right-0 left-0" onClick={handleNav}>
          <ButtonSignIn title={`Sign in`} href={'/login'} />
        </div> : <div className="absolute mx-[27px] bottom-[47px] right-0 left-0">
          <ButtonSignIn title={`Dashboard`} href={'/dashboard'} />
        </div>}

      </div>
    </nav>
  );
}

export default Navbar;
