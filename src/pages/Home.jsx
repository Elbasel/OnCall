import { AuthenticationForm } from "../components/AuthenticationForm.jsx";

import { MantineProvider, TextInput } from "@mantine/core";

import { CgProfile } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsArrowDownCircle } from "react-icons/bs";

import Jobs from "./Jobs.jsx";

export default function Home() {
  if (localStorage.getItem("user")) {
    return <Jobs />;
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="Home min-h-screen flex flex-col text-white">
        <header className="flex justify-between p-2">
          <h1 className="Logo">OnCall</h1>
          <CgProfile className="text-slate-300" size="2rem" />
        </header>
        <main className="flex-1 mt-52">
          <h2 className="font-serif text-4xl text-center ">
            Find The Best Call Center Jobs In Egypt
          </h2>
          <p className="font-serif text-center my-2">
            Find your next call center job the easy way!
          </p>

          <TextInput
            className="w-11/12 m-auto mt-3 "
            placeholder="Search for jobs"
            icon={<BiSearchAlt2 size="2rem" />}
            radius="lg"
            size="lg"
          />
          <button className="Bounce block mx-auto mt-32">
            <a href="#AuthenticationForm">
              <BsArrowDownCircle size="3rem" />
            </a>
          </button>
        </main>
      </div>
      <div id="AuthenticationForm" className="min-h-screen flex flex-col">
        <h2 className="text-4xl flex items-center justify-center p-12">
          Get Started now
        </h2>
        <AuthenticationForm className="flex-1" />
      </div>
    </MantineProvider>
  );
}
