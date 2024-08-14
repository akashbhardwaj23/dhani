import { useState } from "react";

export function CreatePassword({
  onNext,
}: {
  onNext: (password: string) => void;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [correctPassword, setCorrectPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const sendpassword = () => {
    // check if password and correctPassword are same
    if (password !== correctPassword) {
      setError("Your Password Do not Match");
      setIsChecked((prev) => !prev);
      return;
    }
    if(password){
      console.log(password)
        onNext(password)
    }
    

  };

  return (
    <div className="max-w-xl w-full flex h-full items-center flex-col">
      <div className="mb-12">
        <h1 className="text-4xl text-white font-semibold mb-6 tracking-normal flex justify-center">
          Create a Password
        </h1>
        <h2 className="text-[#969fa5] text-base font-medium tracking-normal">
          <span className="flex justify-center">
            It should be at least 8 characters.
          </span>
          <span className="flex justify-center">
            You’ll need this to unlock Backpack.
          </span>
        </h2>
      </div>

      <div className="w-full flex flex-col mb-24 relative">
        <input
          type={`${showPassword ? "text" : "password" }`}
          className="px-4 py-3 mb-6 bg-[#202127] rounded-lg text-white font-semibold focus:outline-none focus:outline-2 focus:outline-[#4b93f8]"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
       

        {showPassword ? (<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#6d7383"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute right-3 top-3 hover:cursor-pointer"
          onClick={() => setShowPassword(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>) : (
             <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="#6d7383"
             viewBox="0 0 24 24"
             strokeWidth="1.5"
             stroke="currentColor"
             className="size-6 absolute right-3 top-3 hover:cursor-pointer\"
             onClick={() => setShowPassword(true)}
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
             />
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
             />
           </svg>
        )}

        
        <input
          type="text"
          className="px-4 py-3 bg-[#202127] rounded-lg text-white mb-2 font-semibold focus:outline-none focus:outline-2 focus:outline-[#4b93f8]"
          placeholder="Confirm Password"
          onChange={(e) => setCorrectPassword(e.target.value)}
        />
        {error && <h1 className="text-[#f14948] text-sm font-bold">{error}</h1>}
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="text-[#8e94a5] mb-4 flex justify-center items-center">
          <input
            type="checkbox"
            className="mr-2 p-4 h-4 w-4 hover:cursor-pointer"
            checked={isChecked}
            onChange={(e) => setIsChecked((prev) => !prev)}
          />
          <span
            className="font-semibold hover:cursor-pointer"
            onClick={() => setIsChecked((prev) => !prev)}
          >
            I agree to{" "}
            <span className="text-[#4c94f0]">Terms annd Services</span>
          </span>
        </div>

        <button
          className="bg-white text-black px-4 py-3 text-base font-semibold hover:cursor-pointer rounded-xl mb-4 disabled:bg-[#b7b7b9] w-1/2 tracking-tight"
          disabled={!isChecked}
          onClick={sendpassword}
        >
          Next
        </button>
      </div>
    </div>
  );
}
