import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <div className=" flex flex-col lg:flex-row items-center  bg-[#2B2929]  dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="font-bold text-5xl w-fit max-w-3xl">
            Welcome to Dropbox <br />
            <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <p className="pb-20">
            Ipsum ut takimata sed duo amet gubergren, gubergren et est nonumy
            dolor duo ea gubergren, sed diam vero clita lorem est. Vero rebum
            eos diam lorem, consetetur et et ipsum et amet invidunt elitr et ut.
            Sit et duo dolores. Ipsum ut takimata sed duo amet gubergren,
            gubergren et est nonumy dolor duo ea gubergren, sed diam vero clita
            lorem est. Vero rebum eos diam lorem, consetetur et et ipsum et amet
            invidunt elitr et ut. Sit et duo dolores
          </p>

          <Link
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
            href={"/dashboard"}
          >
            Click here to begin! <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div></div>
      </div>
    </main>
  );
}
