import Button from '@components/Button';
import Swal from 'sweetalert2';

const newsLetterText = 'Subscribe to Newsletter';
const SubscribeNewsletter = () => {
  const handleSubscribe = (e: any) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      iconColor: '#C10206',
      title: 'Your subscribed successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="pt-[60px] md:pt-[100px] pb-8 md:pb-20">
      <h3 className="text-[32px] md:text-[40px] lg:text-[50px] text-white leading-[58px] font-bold text-center">
        Subscribe to Newsletter
      </h3>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col items-center justify-center gap-5 mt-8 md:flex-row lg:mt-10"
      >
        <input
          required
          type="email"
          placeholder="Enter your email address"
          className="py-5 px-8 rounded-full placeholder:text-white/50 border text-xl outline-none text-white border-white/20 focus:border-white/40 bg-white/10 w-full lg:w-[480px]"
        />
        <div>
          <Button
            type="submit"
            className="py-5 px-[76px] text-xl shrink-0 w-full md:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubscribeNewsletter;
