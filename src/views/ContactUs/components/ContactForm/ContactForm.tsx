import MainForm from './MainForm';

type Props = {
  setShowSuccess: (showSuccess: boolean) => void;
}

const ContactForm = ({ setShowSuccess }: Props) => {
  return (
    <div className="rounded-lg px-[30px] md:px-10 md:pt-[90px] py-[50px] md:pb-[70px] md:py-[50px] bg-white">
      <h1 className="text-2xl md:text-[30px] font-semibold mb-2 md:mb-0 text-[#1D1D1D] leading-[125%]">
        Get In Touch With Us
      </h1>
      <p className="mt-1 text-sm md:text-base">
        Let’s contact us if you have any questions?
      </p>


      <MainForm setShowSuccess={setShowSuccess} />
    </div>
  );
};

export default ContactForm;
