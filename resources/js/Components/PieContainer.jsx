import React from "react";
import { Pie } from "react-chartjs-2";

const PieContainer = ({ children, name }) => {
    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-primary font-bold text-xl my-5 mobile:text-base">
                {name}'s Occupancy
            </h1>
            <div className="h-[30rem] w-[30rem] mobile:h-[15rem] mobile:w-[15rem] mb-10">
                {children}
            </div>
        </div>
    );
};

export default PieContainer;
