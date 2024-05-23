import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    CardBody,
    Breadcrumbs,
} from "@material-tailwind/react";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import moment from "moment";
import Pagination from "@/Components/Pagination";
import PageHeader from "@/Components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
    "Nama Owner",
    "Jenis Tagihan",
    "Biaya Tagihan",
    "Tanggal Tagihan Dibuat",
    "Tanggal Jatuh Tempo",
    "Status Pembayaran",
    // "Dibuat Oleh",
];

export default function UnpaidReport({ auth, errors, data, filters }) {
    const [search, setSearch] = useState("");

    function getStatusColor(status) {
        switch (status) {
            case "Pending":
                return "bg-orange-500"; // Yellow background for pending status
            case "Success":
                return "bg-green-500"; // Green background for success status
            case "Cancel":
                return "bg-red-500"; // Red background for cancel status
            default:
                return ""; // Default background color
        }
    }
    const handleInputChange = (value, type) => {
        if (type === "search") {
            setSearch(value);
        } else if (type === "status") {
            setStatus(value);
        }

        router.get(
            route(route().current()),
            {
                search: type === "search" ? value : search,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    function getPaginationUrl(baseUrl, searchQuery) {
        let url = baseUrl;
        const params = [];

        if (searchQuery) {
            params.push(`search=${encodeURIComponent(searchQuery)}`);
        }

        // Check if baseUrl already has a query parameter
        if (baseUrl.includes("?")) {
            url += "&" + params.join("&");
        } else {
            url += "?" + params.join("&");
        }

        return url;
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Unpaid Billings
                </h2>
            }
        >
            <Head title="Billing List" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full">
                    <Breadcrumbs className="ml-[-0.9rem] w-96 bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-60 text-primaryHover "
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("billing.unpaid.index")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Unpaid Billing
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                handleSearch={(event) =>
                                    handleInputChange(
                                        event.target.value,
                                        "search"
                                    )
                                }
                                title={"Unpaid Billing"}
                                description={
                                    "Informasi Data Billing Yang Belum Lunas"
                                }
                                buttonLabel={"Tambah Billing"}
                                // icon={buttonIcon}
                                addRoute={"billing.add"}
                                label="Cari Nama Unit Owner"
                                hasFilter={true}
                                showAddButton={false}
                            />
                            <div className="mt-5">
                                <div className=" flex flex-wrap">
                                    {/* <div className="w-52 mr-4 tablet:w-full tablet:mt-5">
                                        <InputLabel>Dari Tanggal</InputLabel>
                                        <CustomInput
                                            id="from_date"
                                            onChange={(value) =>
                                                handleInputChange(
                                                    value,
                                                    "from_date"
                                                )
                                            }
                                            className=""
                                            type="date"
                                        />
                                    </div>
                                    <div className="w-52 mr-4 tablet:w-full tablet:mt-5">
                                        <InputLabel>Sampai Tanggal</InputLabel>
                                        <CustomInput
                                            id="until_date"
                                            onChange={(value) =>
                                                handleInputChange(
                                                    value,
                                                    "status"
                                                )
                                            }
                                            className=""
                                            type="date"
                                        />
                                    </div> */}
                                </div>
                            </div>
                            <CardBody className="overflow-scroll px-0">
                                <table
                                    className="mt-4 mobile:mt-0 w-full min-w-max table-auto text-left border "
                                    style={{
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-y  bg-primary py-4 pl-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        className="font-bold text-textColor"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data.map(
                                            (
                                                {
                                                    id,
                                                    owner,
                                                    billing_type,
                                                    billing_fee,
                                                    created_by,
                                                    status,
                                                    billing_date,
                                                    due_date,
                                                    paid_date,
                                                },
                                                index
                                            ) => {
                                                const isLast =
                                                    index ===
                                                    data.data.length - 1;
                                                const classes = isLast
                                                    ? "pl-4 py-2"
                                                    : "pl-4 py-2 border-b border-blue-gray-150";

                                                return (
                                                    <tr
                                                        key={id}
                                                        className="bg-primary/15 hover:bg-primary/5 transition duration-300 text-black"
                                                    >
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {
                                                                        owner.owner_name
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {
                                                                        billing_type
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {new Intl.NumberFormat(
                                                                        "id-ID",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                "IDR",
                                                                        }
                                                                    ).format(
                                                                        billing_fee
                                                                    )}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        {/* <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {moment(
                                                                    billing_date
                                                                ).format("LL")}
                                                            </Typography>
                                                        </td> */}

                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {moment(
                                                                    billing_date
                                                                ).format("LL")}
                                                            </Typography>
                                                        </td>

                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {moment(
                                                                    due_date
                                                                ).format("LL")}
                                                            </Typography>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className={`font-bold capitalize  ${getStatusColor(
                                                                        status
                                                                    )} text-white rounded-2xl w-20 flex justify-center`}
                                                                >
                                                                    {status}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        {/* <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {
                                                                    created_by.name
                                                                }
                                                            </Typography>
                                                        </td> */}
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <Pagination
                                current_page={data.current_page}
                                last_page={data.last_page}
                                prev_page_url={data.prev_page_url}
                                next_page_url={data.next_page_url}
                                search={filters.search}
                                status={filters.status} // Pass the status filter to the Pagination component
                                getPaginationUrl={(baseUrl) =>
                                    getPaginationUrl(
                                        baseUrl,
                                        filters.search,
                                        filters.status
                                    )
                                }
                            />
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
