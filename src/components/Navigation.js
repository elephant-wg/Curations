import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "iconoir-react";
import useEmblaCarousel from "embla-carousel-react";
import Subcategory from "@/components/Subcategory";

export default function Navigation(props) {
  const router = useRouter();
  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [canScrollPrev, setCanScrollPrev] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 0,
    dragFree: true,
    containScroll: "keepSnaps",
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("init", () => {
        setCanScrollPrev(!emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      });
      emblaApi.on("select", () => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      });
      return () => {
        emblaApi.off("init");
        emblaApi.off("select");
      };
    }
  }, [emblaApi]);
  
  
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const designCategory = [
    {
      name: "All",
      icon: <Icon.Globe />,
    },
    {
      name: "Tools",
      icon: <Icon.Tools />,
    },
    {
      name: "Portfolios",
      icon: <Icon.User />,
    },
    {
      name: "Inspiration",
      icon: <Icon.LightBulb />,
    },
    {
      name: "Icons",
      icon: <Icon.Iconoir />,
    },
    {
      name: "Mockups",
      icon: <Icon.Laptop />,
    },
    {
      name: "3D Assets",
      icon: <Icon.Axes />,
    },
    {
      name: "Colors",
      icon: <Icon.ColorWheel />,
    },
    {
      name: "Fonts",
      icon: <Icon.Type />,
    },
    {
      name: "Illustrations",
      icon: <Icon.DesignPencil />,
    },
    {
      name: "Design Studios",
      icon: <Icon.Building />,
    },
    {
      name: "Product Pages",
      icon: <Icon.ShoppingBag />,
    },
    {
      name: "Figma",
      icon: <Icon.Figma />,
    },
    {
      name: "Design Systems",
      icon: <Icon.SystemRestart />,
    },
  ];

  const developmentCategory = [
    {
      name: "All",
      icon: <Icon.Globe />,
    },
    {
      name: "Tools",
      icon: <Icon.Tools />,
    },
    {
      name: "Frameworks",
      icon: <Icon.Calculator />,
    },
    {
      name: "Repositories",
      icon: <Icon.GitHub />,
    },
    {
      name: "IDEs",
      icon: <Icon.CodeBrackets />,
    },
    {
      name: "Coding Info",
      icon: <Icon.InputField />,
    },
    {
      name: "CSS",
      icon: <Icon.Css3 />,
    },
  ];

  const productivityCategory = [
    {
      name: "All",
      icon: <Icon.Globe />,
    },
    {
      name: "Tools",
      icon: <Icon.Tools />,
    },
    {
      name: "Analytics",
      icon: <Icon.LineSpace />,
    },
    {
      name: "Survey",
      icon: <Icon.SquareWave />,
    },
    {
      name: "Typing",
      icon: <Icon.KeyAltBack />,
    },
    {
      name: "Presentations",
      icon: <Icon.Presentation />,
    },
    {
      name: "Mac Apps",
      icon: <Icon.Apple />,
    },
    {
      name: "Audiovisual",
      icon: <Icon.VideoCamera />,
    },
    {
      name: "File Sharing",
      icon: <Icon.AddFolder />,
    },
    {
      name: "Job Boards",
      icon: <Icon.Suggestion />,
    },
  ];

  const learningCategory = [
    {
      name: "All",
      icon: <Icon.Globe />,
    },
    {
      name: "Startups",
      icon: <Icon.Rocket />,
    },
    {
      name: "Material",
      icon: <Icon.Book />,
    },
    {
      name: "Blog",
      icon: <Icon.PageFlip />,
    },
    {
      name: "Resource Pages",
      icon: <Icon.SquareWave />,
    },
    {
      name: "Books",
      icon: <Icon.BookmarkBook />,
    },
    {
      name: "Documentations",
      icon: <Icon.VideoProjector />,
    },
    {
      name: "Quotes",
      icon: <Icon.Quote />,
    },
    {
      name: "YT Videos",
      icon: <Icon.Play />,
    },
  ];

  const handleNavigation = (e) => {
    const target = e.target;
    const targetPos = target.offsetLeft;
    const targetWidth = target.offsetWidth;

    props.rect.current.style.transform = `translateX(${targetPos}px)`;
    props.rect.current.style.width = `${targetWidth}px`;

    if (target.innerText === "Code") {
      props.setCategory({ category: "development" });
    }
    if (target.innerText !== "Code") {
      props.setCategory({ category: target.innerText.toLowerCase() });
    }

    if (target.innerText !== "All") {
      props.handleCategory(target.innerText.toLowerCase(), "All");
    } else {
      props.loadCategoryItems("all");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between px-[2%] h-24 place-items-center">
        <div className="flex place-items-center">
          <Image
            loader={imgLoader}
            src="/images/curations_logo.png"
            alt="Curations Logo"
            className="max-h-7 object-contain object-left"
            width={150}
            height={200}
          />
        </div>
        <div
          ref={props.navigation}
          className="flex place-items-center p-1 rounded-full ring-2 z-40 ring-zinc-800 text-sm font-medium text-white fixed translate-x-[-50%] left-[50%] bg-[#0D0D0D] max-lg:w-[90%] max-lg:justify-between max-lg:translate-y-16 transition-all duration-100 max-md:text-[12px]"
        >
          <div
            ref={props.mainNavigation.all}
            onClick={(e) => {
              handleNavigation(e);
              router.push("/");
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:hidden"
          >
            All
          </div>
          <div
            ref={props.mainNavigation.design}
            onClick={(e) => {
              handleNavigation(e);
              props.setSubCategory("All");
              if (router.query.category !== "design") {
                router.push({
                  pathname: "/",
                  query: { category: "design" },
                });
              }
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:text-[12px] flex-grow max-lg:text-center"
          >
            Design
          </div>
          <div
            ref={props.mainNavigation.development}
            onClick={(e) => {
              handleNavigation(e);
              props.setSubCategory("All");
              if (router.query.category !== "development") {
                router.push({
                  pathname: "/",
                  query: { category: "development" },
                });
              }
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-sm:hidden"
          >
            Development
          </div>
          <div
            ref={props.mainNavigation.code}
            onClick={(e) => {
              handleNavigation(e);
              props.setSubCategory("All");
              if (router.query.category !== "development") {
                router.push({
                  pathname: "/",
                  query: { category: "development" },
                });
              }
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:text-[12px] flex-grow sm:hidden max-md:text-center"
          >
            Code
          </div>
          <div
            ref={props.mainNavigation.productivity}
            onClick={(e) => {
              handleNavigation(e);
              props.setSubCategory("All");
              if (router.query.category !== "productivity") {
                router.push({
                  pathname: "/",
                  query: { category: "productivity" },
                });
              }
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:text-[12px] flex-grow max-lg:text-center"
          >
            Productivity
          </div>
          <div
            ref={props.mainNavigation.learning}
            onClick={(e) => {
              handleNavigation(e);
              props.setSubCategory("All");
              if (router.query.category !== "learning") {
                router.push({
                  pathname: "/",
                  query: { category: "learning" },
                });
              }
            }}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:text-[12px] flex-grow max-lg:text-center"
          >
            Learning
          </div>
          <div
            ref={props.rect}
            className={
              "transition-all h-9 w-12 bg-zinc-800 rounded-full absolute z-0 left-0 duration-300 translate-x-1 max-md:w-16"
            }
          />
        </div>
        <div className="flex gap-4 place-items-center">
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
              props.sidebarWrapper.current.classList.remove(
                "translate-x-[100%]"
              );
              props.plusIcon.current.classList.add("rotate-45");
              document.body.style.overflow = "hidden";
            } else {
              props.sidebarWrapper.current.classList.add("opacity-0");
              props.sidebarWrapper.current.classList.add("translate-x-[100%]");
              props.plusIcon.current.classList.remove("rotate-45");
              document.body.style.overflow = "auto";
            }
          }}
        />
        </div>
      </div>
      {props.category.category === "design" && (
        <Subcategory
          subcategoryItems={designCategory}
          subCategory={props.subCategory}
          emblaRef={emblaRef}
          setSubCategory={props.setSubCategory}
          handleNavigation={handleNavigation}
          handleCategory={props.handleCategory}
          emblaApi={emblaApi}
          category={props.category}
          scrollNext={scrollNext}
          scrollPrev={scrollPrev}
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
        />
      )}
      {props.category.category === "development" && (
        <Subcategory
          subcategoryItems={developmentCategory}
          subCategory={props.subCategory}
          emblaRef={emblaRef}
          setSubCategory={props.setSubCategory}
          handleNavigation={handleNavigation}
          handleCategory={props.handleCategory}
          emblaApi={emblaApi}
          category={props.category}
          scrollNext={scrollNext}
          scrollPrev={scrollPrev}
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
        />
      )}
      {props.category.category === "productivity" && (
        <Subcategory
          subcategoryItems={productivityCategory}
          subCategory={props.subCategory}
          emblaRef={emblaRef}
          setSubCategory={props.setSubCategory}
          handleNavigation={handleNavigation}
          handleCategory={props.handleCategory}
          emblaApi={emblaApi}
          category={props.category}
          scrollNext={scrollNext}
          scrollPrev={scrollPrev}
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
        />
      )}
      {props.category.category === "learning" && (
        <Subcategory
          subcategoryItems={learningCategory}
          subCategory={props.subCategory}
          emblaRef={emblaRef}
          setSubCategory={props.setSubCategory}
          handleNavigation={handleNavigation}
          handleCategory={props.handleCategory}
          emblaApi={emblaApi}
          category={props.category}
          scrollNext={scrollNext}
          scrollPrev={scrollPrev}
          canScrollNext={canScrollNext}
          canScrollPrev={canScrollPrev}
        />
      )}
    </>
  );
}
