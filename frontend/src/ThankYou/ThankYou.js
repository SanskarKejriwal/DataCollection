import React from "react";

const ThankYou = () => {
  return (
    <div>
      <div class="flex justify-center ">
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-col md:flex-row max-w-7xl justify-center items-center ">
            <div class="overflow-hidden w-2/3 m-4 flex justify-center ">
              <div class="flex  items-center justify-center  ">
                <div class="  items-center justify-center flex flex-col lg:flex-row ">
                  <div class="flex items-center justify-around h-60  w-full lg:text-left text-center ">
                    <div class="flex flex-col md:flex-row items-center  ">
                      <img
                        src="https://source.unsplash.com/100x100/?man,boy"
                        alt=""
                        class="rounded-full"
                      />
                      <div>
                        <div class="font-bold text-gray-600 mx-4">John Doe</div>
                        <div class="text-sm font-medium text-gray-500 hover:text-stone-500 mx-4">
                          <a href="#">SEO Executive, Tailblocks</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-gray-600 text-xl font-medium lg:text-left text-center ">
                    {" "}
                    Tailblocks provides best Tailwind CSS Components and Blocks
                    to create an unique websites within minutes. It has upto 60+
                    free components for front-end Web Development.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
