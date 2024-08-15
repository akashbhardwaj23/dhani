import { Loading } from "@/components/ui/loading";
import { getMneumonics, validate } from "@/server/mnemonic";
import { useEffect, useState } from "react";

export function MnemonicInput({ onNext }: { onNext: (data: any) => any }) {
  const [mneumonicWords, setMneumonicWords] = useState<string[]>([]);
  const mneumonics = mneumonicWords.map((e) => e.trim()).join(" ");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const getMeumonicsWords = async () => {
      const response = await getMneumonics();
      console.log(response);
      setMneumonicWords(response);
    };

    getMeumonicsWords();
  }, []);

  const copyPhrase = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5_000);
    await navigator.clipboard.writeText(
      mneumonicWords.map((word) => word.trim()).join(" ")
    );
  };

  const next = async () => {
    const isValid = await validate(mneumonics);
    if (isValid) {
      await onNext(mneumonics);
    } else {
      setError("Invalid secret recovery phrase");
    }
  };

  if (mneumonicWords.length <= 0) {
    return (
      <div className="max-w-xl w-full flex h-96 items-center justify-center flex-col">
        <h1 className="text-2xl text-white font-semibold flex justify-center">
          <Loading />
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full flex h-full items-center flex-col">
      <div className="mb-8">
        <h1 className="text-4xl text-white font-semibold mb-6 tracking-normal flex justify-center">
          Secret Recovery Phrase
        </h1>
        <h2 className="text-[#969fa5] text-base font-medium mb-8 tracking-normal flex justify-center">
          Save these words in a safe place.
        </h2>

        <h1 className="text-[#4a91fa] contrast-100 text-base font-bold tracking-normal flex justify-center">
          Read the warnings again
        </h1>
      </div>

      <div
        className="bg-[#202127] p-2 w-full h-auto pb-9 rounded-xl mb-6 hover:cursor-pointer hover:bg-[#1d1d23]"
        onClick={() => copyPhrase()}
      >
        <MneumonicTable mneumonicWords={mneumonicWords} />
        <div className="border-t border-[#969fa5] flex justify-center pt-1">
          {copied ? (
            <h1 className="text-sm text-[#969fa5]">
                copied
            </h1>
          ) : (
            <h1 className="text-sm text-[#969fa5]">
              click anywhere on this card to copy
            </h1>
          )}
        </div>
      </div>

      <div className="text-[#969faf] text-base font-medium hover:cursor-pointer flex justify-center items-center mb-4">
        <input
          type="checkbox"
          className="mr-2 h-[1.1rem] w-[1.1rem] accent-transparent"
          checked={isChecked}
          onChange={(e) => setIsChecked((prev) => !prev)}
        />
        <span onClick={() => setIsChecked(prev => !prev)}>I saved my secret recovery phrase</span>
      </div>

      <div className="w-full flex justify-center">
        <button
          className="bg-white text-[#14151b] px-4 py-3 text-center text-base font-semibold rounded-xl mb-4 w-1/2 tracking-tight hover:cursor-pointer disabled:bg-[#b7b7b9]"
          disabled={!isChecked}
          onClick={async () => {
            setLoading(true);
            await next();
            setLoading(false);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function MneumonicTable({ mneumonicWords }: { mneumonicWords: string[] }) {
  let newMneumonic = [];
  let chunkSize = 3;

  for (let i = 0; i < mneumonicWords.length; i += chunkSize) {
    newMneumonic.push(mneumonicWords.slice(i, i + chunkSize));
  }

  console.log(newMneumonic);

  return (
    <table className="w-full h-full border-separate border-spacing-4 ">
      <tbody>
        {newMneumonic.map((mneumonicArray, i) => (
          <tr key={i}>
            {mneumonicArray.map((word, index) => (
              <td className="text-start text-sm" key={word + i + index}>
                <span className="mr-4 text-[#969fa5]">{i + 1 + index}</span>
                <span className="text-white font-semibold">{word}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
