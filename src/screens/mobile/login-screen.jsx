const LoginScreen = () => {
  return (
    <div className={`py-4 bg-opacity-60 h-screen flex  justify-center items-center z-100`}>
      <div className="flex flex-col bg-black justify-between rounded-2xl bg-zinc-900  p-8 min-w-20 loginModal" style={{ width: "250px" }}>
        <h1 className="m-auto flex text-3xl items-center  gap-2 text-white pointer-events-none">Sign in</h1>
        <a href="/auth/google" className="mt-8 block rounded-md  px-3 py-2 text-center text-md font-semibold leading-6 shadow-sm hover:bg-blue-50 cursor-pointer flex justify-center  items-center cursor-pointer loginButton text-white hover:text-black">
          <img src={"	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"} className="w-10 h-6 pointer-events-none" /> Google
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
