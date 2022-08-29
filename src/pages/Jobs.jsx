import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import SearchInput from "../components/SearchInput";
import { Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import JobList from "./JobList";
import { useEffect } from "react";
import { useScrollDirection } from "../hooks/useScrollDir";

export default function Jobs() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUser(user);
    }
  });

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     console.log("window.scrollY", window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const scrollDir = useScrollDirection();

  const showNavBar = () => {
    setNavBarVisibility("slide-down");
  };

  const hideNavBar = () => {
    setNavBarVisibility("slide-up");
  };

  useEffect(() => {
    if (scrollDir === "up") {
      showNavBar();
      return;
    }
    if (scrollDir === "down") {
      hideNavBar();
    }
  }),
    [scrollDir];

  const [navBarVisibility, setNavBarVisibility] = useState("");

  return (
    <div className="">
      <header
        className={`bg-white flex items-center gap-2 fixed p-1 ${navBarVisibility}`}
      >
        <h1 className="Logo text-blue-700">OnCall</h1>
        <SearchInput />
        <button>
          <CgProfile className="text-black" size="2rem" />
        </button>
      </header>
      <nav>
        <Tabs defaultValue="jobs">
          <Tabs.List
            grow={true}
            className={`${navBarVisibility} fixed w-full mt-12 bg-white shadow-md`}
          >
            <Tabs.Tab className="text-lg" value="jobs">
              Jobs
            </Tabs.Tab>
            <Tabs.Tab className="text-lg" value="saved">
              Saved
            </Tabs.Tab>
            <Tabs.Tab className="text-lg" value="applications">
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="jobs" pt="xs">
            <JobList />
          </Tabs.Panel>
        </Tabs>
      </nav>
    </div>
  );
}
