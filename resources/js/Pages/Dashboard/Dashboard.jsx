import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import CustomTable from "@/Components/CustomTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    auth,
    errors,
    data,
    paidData,
    unpaidData,
    penaltyData,
}) {
    const truncateLabel = (label, maxLength) => {
        return label.length > maxLength
            ? label.substring(0, maxLength) + "..."
            : label;
    };
    const prepareChartData = (data) => {
        const labels = data.map((item) =>
            truncateLabel(item.apartment_name, 20)
        );

        const ownerCounts = data.map((item) => item.owner_count);

        return {
            labels,
            datasets: [
                {
                    label: "Number of Owners",
                    data: ownerCounts,
                    backgroundColor: "rgba(126, 78, 251, 0.4)",
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Number of Owners for Each Apartment",
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                    autoSkip: false, // Ensure all labels are displayed
                },
            },
        },
    };

    const chartData = prepareChartData(data);

    console.log(paidData);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full h-full">
                    <Breadcrumbs className="ml-[-0.9rem] w-96 bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-100 text-primaryHover font-extrabold "
                        >
                            Dashboard
                        </Link>

                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <div className="py-6 text-primary font-extrabold text-2xl text-center tablet:text-xl">
                            Welcome to Dashboard, {auth.user.name}
                        </div>
                        <div className="p-5 flex flex-col flex-wrap ">
                            <Bar
                                data={chartData}
                                options={chartOptions}
                                className="  border-primary rounded-3xl shadow-[0_1px_50px_#c3b0f7] p-6 "
                            />
                            <div className="h-96 laptop:h-full flex tablet:flex-col gap-8 laptop:gap-0  mt-8  rounded-3xl shadow-[0_1px_50px_#c3b0f7] p-6">
                                <CustomTable
                                    data={paidData}
                                    title="Tagihan IPL yang Sudah Bayar"
                                    route={route("billing.paid.index")}
                                />

                                <CustomTable
                                    data={unpaidData}
                                    title="Tagihan IPL yang Belum Bayar"
                                    route={route("billing.unpaid.index")}
                                />
                                <CustomTable
                                    data={penaltyData}
                                    title="Tagihan IPL yang Terkena Denda"
                                    route={route("billing.penalties.index")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
