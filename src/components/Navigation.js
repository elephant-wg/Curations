import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import * as Icon from "iconoir-react";

export default function Navigation(props) {
  const mainNavigation = {
    all: useRef(),
    design: useRef(),
    development: useRef(),
    productivity: useRef(),
    learning: useRef(),
  };
  const rect = useRef();
  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const handleNavigation = (e) => {
    const target = e.target;
    const targetPos = target.offsetLeft;
    const targetWidth = target.offsetWidth;

    rect.current.style.transform = `translateX(${targetPos}px)`;
    rect.current.style.width = `${targetWidth}px`;

    props.setCategory({ category: target.innerText.toLowerCase() });
  };

  return (
    <div className="w-full flex justify-between py-8 place-items-center">
      <Link href="/">
        <Image
          loader={imgLoader}
          src="/images/curations_logo.png"
          alt="Curations Logo"
          className="max-h-7 object-contain"
          width={200}
          height={200}
        />
      </Link>
      <div ref={props.navigation} className="flex place-items-center p-1 rounded-full ring-2 ring-zinc-800 text-sm font-medium text-white fixed translate-x-[-50%] left-[50%] bg-[#0D0D0D] max-md:translate-y-14 transition-all duration-100">
        <div
          ref={mainNavigation.all}
          onClick={(e) => handleNavigation(e)}
          className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:hidden"
        >
          All
        </div>
        <div
          ref={mainNavigation.design}
          onClick={(e) => handleNavigation(e)}
          className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
        >
          Design
        </div>
        <div
          ref={mainNavigation.development}
          onClick={(e) => handleNavigation(e)}
          className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
        >
          Development
        </div>
        <div
          ref={mainNavigation.productivity}
          onClick={(e) => handleNavigation(e)}
          className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
        >
          Productivity
        </div>
        <div
          ref={mainNavigation.learning}
          href="/learning"
          onClick={(e) => handleNavigation(e)}
          className="z-10 cursor-pointer px-4 py-2 max-md:px-2 hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
        >
          Learning
        </div>
        <div
          ref={rect}
          className={
            "transition-all h-9 w-12 bg-zinc-800 rounded-full absolute z-0 left-0 duration-300 translate-x-1 max-md:w-16"
          }
        />
      </div>
      <Icon.Plus
        className="bg-white rounded-full p-0.5 cursor-pointer text-black transition-all hover:opacity-80 z-50 duration-700"
        fontSize={24}
        ref={props.plusIcon}
        onClick={() => {
          if (
            props.sidebarWrapper.current.classList.contains("opacity-0") &&
            props.sidebarWrapper.current.classList.contains(
              "translate-x-[100%]"
            )
          ) {
            props.sidebarWrapper.current.classList.remove("opacity-0");
            props.sidebarWrapper.current.classList.remove("translate-x-[100%]");
            props.plusIcon.current.classList.add("rotate-45");
          } else {
            props.sidebarWrapper.current.classList.add("opacity-0");
            props.sidebarWrapper.current.classList.add("translate-x-[100%]");
            props.plusIcon.current.classList.remove("rotate-45");
          }
        }}
      />
    </div>
  );
}
