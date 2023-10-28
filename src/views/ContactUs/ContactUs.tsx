import ContactImage from '@components/Icons/images/ContactImage';
import SocialMediaIcon from '@components/Icons/SocialMediaIcon';
import { contactPageSocialLinks } from '@config/constants';
import { BsEnvelope, BsTelephone } from 'react-icons/bs';
import ContactForm from './components/ContactForm';
import ContactInfoCard from './components/ContactInfoCard';
import ContactSuccess from './components/ContactSuccess';
import { useState } from 'react'

const ContactUs = () => {

  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section className="pb-10 bg-[#F1F4FA] xl:pt-[180px] xl:pb-[100px] lg:pt-[160px] lg:pb-[90px md:pt-[140px] md:pb-[80px] pt-[100px]">

      <div className="px-0 md:px-5 maxlg:max-w-full container">
        <div className="md:flex md:flex-col-reverse items-center lg:grid lg:grid-cols-[638px,auto] gap-10">

          {/* Contact Form --Start-- */}
          {!showSuccess ? <ContactForm setShowSuccess={setShowSuccess} /> : <ContactSuccess />}
          {/* Contact Form --End-- */}

          <div className="hidden lg:block">
            <ContactImage />
          </div>
        </div>
      </div>

      {/* Phone, Email, Social Section --Start-- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-6 mt-10 lg:mt-[100px] container">
        <ContactInfoCard
          icon={<BsTelephone size={34} />}
          title="Phone"
          content="+8801851-590694"
        />
        <ContactInfoCard
          icon={<BsEnvelope size={34} />}
          title="Email Us"
          content={
            <a href="mailto:digitalgregg@gmail.com" className="hover:text-red">
              digitalgregg@gmail.com
            </a>
          }
        />
        <ContactInfoCard
          icon={<SocialMediaIcon />}
          title="Our Social Media "
          content={
            <div className="flex justify-center flex-wrap gap-4 md:gap-0 lg:gap-[25px]">
              {contactPageSocialLinks.map(({ icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group md:scale-[0.7] lg:scale-100 inline-block w-10 relative"
                >
                  {icon}
                  <span className="absolute top-0 left-0 h-full w-full bg-transparent group-hover:bg-black/20 duration-150 rounded-full"></span>
                </a>
              ))}
            </div>
          }
        />
      </div>
      {/* Phone, Email, Social Section --End-- */}
    </section>
  );
};

export default ContactUs;
