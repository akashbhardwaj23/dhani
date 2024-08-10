export function Appbar({
  onClick,
  walletPublicKey
} : {
  onClick : () => void,
  walletPublicKey : string
}) {
  return (
    <div className="flex justify-between px-4  items-center w-full">
      <div className="bg-[#969faf] p-2 rounded-full">
        <img src="/airdrop.png" alt="airdrop" className="w-8 h-8" />
      </div>
      <div className="w-1/2 grid grid-cols-5 h-full items-center bg-[#202127] rounded-3xl  border border-[#37383d]">
        <div className="p-2 pl-3 rounded-l-3xl float-left col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer">
          <img
            src="https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png"
            alt="sol"
            className="w-8 h-8"
          />
        </div>
        <div className="flex border-x-2 border-[#37383d] h-full justify-center items-center col-span-3 text-base text-white font-semibold hover:bg-[#0e0f14] hover:cursor-pointer" onClick={onClick}>
          <span className="mr-2">Wallet 1</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8d96a4"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div className="p-2 h-full flex justify-center items-center rounded-r-3xl col-span-1 hover:bg-[#0e0f14] hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#4a4d59"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </div>
      </div>
      <div className="hover:animate-bounce hover:cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4a4d59" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>
</div>
    </div>
  );
}
