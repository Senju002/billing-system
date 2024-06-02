import React from "react";
import { Pie } from "react-chartjs-2";

const BillingPieContainer = ({ children, name }) => {
    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-primary font-bold text-xl my-5 mobile:text-base">
                {name}
            </h1>
            <div className="h-[20rem] w-[20rem] mobile:h-[15rem] mobile:w-[15rem] mb-10">
                {children}
            </div>
        </div>
    );
};

export default BillingPieContainer;
