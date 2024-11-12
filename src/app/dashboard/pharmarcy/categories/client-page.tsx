"use client";

import { useEffect, useState } from "react";
import PageToolBar from "@/components/dashboard/pharmacy-page-toolbar";
import { categories } from "@/constants";
import RangeSlider from "@/components/dashboard/range-slider";
// import ProductCard from "@/components/dashboard/pharmacy-product-card";
import onlinePharmacyApi from "@/api/online-pharmacy";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
// interface Category {

//     [{category: string,
//     _id: string]

// }
export default function CategoryPage() {
  const { data: session } = useSession();
  const { data: cats } = useFetch(onlinePharmacyApi.getAllCategories);
  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string[] | null>(null);
  const [subSubCategory, setSubSubCategory] = useState<string[] | null>([]);
  const [displayProducts, setDisplayProducts] = useState(false);
  useEffect(() => {
    if (cats?.data) setCategory(cats?.data[0].category);
  }, [cats]);
  const resetSubCategories = () => {
    setSubCategory(null);
    setSubSubCategory(null);
    setDisplayProducts(false); // remove this later cos it does nothing
  };
  const getSubCategories = async (category: string) => {
    const subcat = await onlinePharmacyApi.getSubCategories(session!, category);
    const c = subcat.data.map((d) => d.subcategory);
    setSubCategory(c);
  };

  const navigateToLevel = (
    level: "category" | "subCategory" | "subSubCategory",
    id?: string,
  ) => {
    switch (level) {
      case "category":
        resetSubCategories();
        getSubCategories(id!);
        break;
      case "subCategory":
        setSubSubCategory(null);
        break;
      case "subSubCategory":
        break;
    }
  };

  const renderHeader = () => {
    return (
      <h2 className="mb-5 font-bold capitalize text-primary-500">
        <span
          onClick={() => navigateToLevel("category")}
          className="cursor-pointer hover:underline"
        >
          {category}
        </span>
        {subCategory && (
          <>
            {" / "}
            <span
              onClick={() => navigateToLevel("subCategory")}
              className="inline-block cursor-pointer hover:underline"
              style={{ textTransform: "capitalize" }}
            >
              {subCategory}
            </span>
          </>
        )}
        {subSubCategory && (
          <>
            {" / "}
            <span
              onClick={() => navigateToLevel("subSubCategory")}
              className="inline-block cursor-pointer capitalize hover:underline"
              style={{ textTransform: "capitalize" }}
            >
              {subSubCategory}
            </span>
          </>
        )}
      </h2>
    );
    // };

    // const renderContent = () => {
    //   if (subSubCategory !== null) {
    //     return categories[category][subCategory!][subSubCategory].map((drug) => (
    //       <li key={drug} className="capitalize">
    //         <button
    //           onClick={() => setDisplayProducts(true)}
    //           className="capitalize"
    //         >
    //           {drug}
    //         </button>
    //       </li>
    //     ));
    //   } else if (subCategory !== null) {
    //     return (subCategory).map((subSubCat) => (
    //       <li key={subSubCat} className="capitalize">
    //         <button
    //           onClick={() => setSubSubCategory(subSubCat)}
    //           className="capitalize"
    //         >
    //           {subSubCat}
    //         </button>
    //       </li>
    //     ));
    //   }
    // else {
    //   return Object.keys(categories[category]).map((subCat) => (
    //     <li key={subCat} className="capitalize">
    //       <button onClick={() => setSubCategory(subCat)} className="capitalize">
    //         {subCat}
    //       </button>
    //     </li>
    //   ));
    // }
  };

  return (
    <main>
      <PageToolBar />

      {!displayProducts ? (
        <div className="flex p-8">
          <aside className="grid gap-y-3 text-sm">
            {/* Categories */}
            <div className="bg-gray-100 p-5">
              <h2 className="mb-3 text-primary-500">CATEGORIES</h2>
              <ul className="grid gap-y-5">
                {cats?.data.map((cat, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        // getSubCategories(cat._id);
                        setCategory(cat.category);
                        resetSubCategories();
                      }}
                      className="capitalize"
                    >
                      {cat.category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="grow border border-gray-300 px-8 py-6">
            {renderHeader()}
            <ul className="grid grid-cols-2 text-gray-500">
              {/* {renderContent()} */}
            </ul>
          </section>
        </div>
      ) : (
        <CategoryProducts
          setCategory={setCategory}
          resetSubCategories={resetSubCategories}
        />
      )}
    </main>
  );
}

function CategoryProducts({
  setCategory,
  resetSubCategories,
}: {
  setCategory: (para: string) => void;
  resetSubCategories: () => void;
}) {
  return (
    <div className="flex p-8">
      <aside className="grid gap-y-3 text-sm">
        {/* Categories */}
        <div className="bg-gray-100 p-5">
          <h2 className="mb-3 text-primary-500">CATEGORIES</h2>
          <ul className="grid gap-y-5">
            {Object.keys(categories).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setCategory(cat);
                    resetSubCategories();
                  }}
                  className="capitalize"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="bg-gray-100 p-5">
          <h2 className="mb-5">BY BRANDS</h2>

          <div className="mb-6 h-7 border border-[#D1D1D1] bg-white"></div>
          <ul className="grid gap-y-1.5">
            {[
              { name: "Lifemat", number: 3 },
              { name: "Soft King", number: 2 },
            ].map(({ name, number }) => (
              <li key={name} className="flex items-center gap-x-1.5">
                <input type="checkbox" /> {name}{" "}
                <span className="text-[#666666]">({number})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="bg-gray-100 p-5">
          <h2 className="mb-5">BY PRICE</h2>
          <RangeSlider />
        </div>

        {/* Review */}
        <div className="bg-gray-100 p-5">
          <h2 className="mb-5">BY REVIEW</h2>

          <ul className="grid gap-y-1.5">
            {[
              { rate: 5, number: 3 },
              { rate: 2, number: 2 },
            ].map(({ number }, i) => (
              <li key={i} className="flex items-center gap-x-1.5">
                <input type="checkbox" />

                <span className="text-[#666666]">({number})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Color */}
        <div className="bg-gray-100 p-5">
          <h2 className="mb-5">BY COLOR</h2>

          <ul className="flex items-center gap-x-1.5">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <li key={i}>
                  <button className="h-7 w-7 rounded-full bg-[#504F54]" />
                </li>
              ))}
          </ul>
        </div>
      </aside>
      <section className="grow px-6">
        <h2 className="mb-5 text-2xl font-semibold">Beauty and Cosmetics</h2>
        {/* <div className="grid grid-cols-4 justify-center gap-7">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div> */}
      </section>
    </div>
  );
}
