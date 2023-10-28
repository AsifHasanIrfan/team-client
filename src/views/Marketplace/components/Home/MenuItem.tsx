type PropsTypes = {
  icon: any;
  text: string;
  isActive: boolean;
  onClick: any;
};

const MenuItem = ({ icon, text, onClick, isActive }: PropsTypes) => {
  return (
    <li
      className={`flex flex-row items-center gap-[12px] hover:text-lightHover cursor-pointer pb-[20px] transition-all duration-300 ${isActive && 'text-primary'
        }`}
      onClick={onClick}
    >
      <span className=" text-[22px] ">{icon}</span>
      <h3 className="text-[18px] font-[500] line-[21px]">{text}</h3>
    </li>
  );
};

export default MenuItem;
