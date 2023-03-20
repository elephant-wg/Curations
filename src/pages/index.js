import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RiveComponent from "@rive-app/react-canvas";
import Navigation from "@/components/Navigation";
import About from "@/components/About";

export default function Curations() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({ category: "all" });
  const [subCategory, setSubCategory] = useState("All");
  const [items, setItems] = useState([]);
  const sidebarWrapper = useRef(null);
  const plusIcon = useRef(null);
  const navigation = useRef(null);
  const rect = useRef();
  const router = useRouter();
  const mainNavigation = {
    all: useRef(),
    design: useRef(),
    development: useRef(),
    code: useRef(),
    productivity: useRef(),
    learning: useRef(),
  };
  const main = useRef();

  const moveRect = useCallback(() => {
    if (router.query.category === "design") {
      mainNavigation.design.current.offsetLeft;
      mainNavigation.design.current.offsetWidth;
      rect.current.style.transform = `translateX(${mainNavigation.design.current.offsetLeft}px)`;
      rect.current.style.width = `${mainNavigation.design.current.offsetWidth}px`;
    } else if (
      router.query.category === "development" ||
      router.query.category === "code"
    ) {
      mainNavigation.development.current.offsetLeft;
      mainNavigation.development.current.offsetWidth;
      if (window.innerWidth > 768) {
        rect.current.style.transform = `translateX(${mainNavigation.development.current.offsetLeft}px)`;
        rect.current.style.width = `${mainNavigation.development.current.offsetWidth}px`;
      } else {
        rect.current.style.transform = `translateX(${mainNavigation.code.current.offsetLeft}px)`;
        rect.current.style.width = `${mainNavigation.code.current.offsetWidth}px`;
      }
    } else if (router.query.category === "productivity") {
      mainNavigation.productivity.current.offsetLeft;
      mainNavigation.productivity.current.offsetWidth;
      rect.current.style.transform = `translateX(${mainNavigation.productivity.current.offsetLeft}px)`;
      rect.current.style.width = `${mainNavigation.productivity.current.offsetWidth}px`;
    } else if (router.query.category === "learning") {
      mainNavigation.learning.current.offsetLeft;
      mainNavigation.learning.current.offsetWidth;
      rect.current.style.transform = `translateX(${mainNavigation.learning.current.offsetLeft}px)`;
      rect.current.style.width = `${mainNavigation.learning.current.offsetWidth}px`;
    }
  }, [router.query.category]);

  useEffect(() => {
    if (router.isReady) {
      if (
        router.query.category !== undefined &&
        router.query.subcategory === undefined
      ) {
        moveRect();
        setCategory({ category: router.query.category });
        loadSubcategoryItems(router.query.category, "All");
      } else if (
        router.query.category !== undefined &&
        router.query.subcategory !== undefined
      ) {
        moveRect();
        loadSubcategoryItems(router.query.category, router.query.subcategory);
        setCategory({ category: router.query.category });
        if (router.query.subcategory.includes("-")) {
          router.query.subcategory = router.query.subcategory.replace(
            /-/g,
            " "
          );
        }
        setSubCategory(router.query.subcategory);
      } else {
        loadCategoryItems("all");
      }
    }
  }, [router]);

  const loadCategoryItems = (category) => {
    main.current.style.pointerEvents = "none";
    setLoading(true);
    fetch("/api/supabase?category=" + category)
      .then((res) => res.json())
      .then((data) => {
        main.current.style.pointerEvents = "auto";
        setLoading(false);
        setItems(data);
      })
      .catch((error) => console.log(error));
  };

  const loadSubcategoryItems = (category, itemName) => {
    main.current.style.pointerEvents = "none";
    setLoading(true);
    fetch("/api/supabase?category=" + category + "&subCategory=" + itemName)
      .then((res) => res.json())
      .then((data) => {
        main.current.style.pointerEvents = "auto";
        setLoading(false);
        setItems(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (e.target.documentElement.scrollTop > 35)
        navigation.current.classList.remove("max-lg:translate-y-16");
      else navigation.current.classList.add("max-lg:translate-y-16");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Curations - Stunning Tools, served daily</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pl-[5%] pr-[5%] min-h-[200vh]" ref={main}>
        <Navigation
          mainNavigation={mainNavigation}
          navigation={navigation}
          category={category}
          setCategory={setCategory}
          sidebarWrapper={sidebarWrapper}
          plusIcon={plusIcon}
          handleCategory={loadSubcategoryItems}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          loadCategoryItems={loadCategoryItems}
          rect={rect}
        />
        {(loading && (
          <RiveComponent
            src="./animations/curations_loading.riv"
            className="max-w-[500px] max-md:h-64 md:h-[256px] object-contain m-auto pt-24"
          />
        )) ||
          (!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center md:px-8 max-md:pt-12">
              {items &&
                items.map((item) => (
                  <Link
                    target="_blank"
                    key={item.id}
                    href={item.link}
                    className="rounded-xl shadow-lg flex flex-col gap-2 transition-all hover:scale-[0.98] focus:outline-1 focus:outline-red-300"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="rounded-lg"
                      />
                    )}
                    <div className="flex gap-4 place-items-center">
                      {item.favicon && (
                        <Image
                          src={item.favicon}
                          alt={item.title + " favicon"}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      )}
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </Link>
                ))}
            </div>
          ))}
        <About sidebarWrapper={sidebarWrapper} plusIcon={plusIcon} />
      </main>
    </>
  );
}
