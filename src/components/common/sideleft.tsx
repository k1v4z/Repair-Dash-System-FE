import bg_Side_Login from "@/assets/images/background-side-login.jpg";

const Sideleft = () => {
  return (
    <div className="hidden lg:block lg:w-[520px] overflow-hidden">
      <img src={bg_Side_Login} alt="" className="w-full h-full object-cover" />
    </div>
  );
};

export default Sideleft;
