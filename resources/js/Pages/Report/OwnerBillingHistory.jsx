import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    CardBody,
    Breadcrumbs,
    Select,
    Option,
} from "@material-tailwind/react";

import { router } from "@inertiajs/react";
import { useState } from "react";
import moment from "moment";
import Pagination from "@/Components/Pagination";
import PageHeader from "@/Components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@/Components/InputLabel";
import BillingRow from "@/Components/BillingRow";

const TABLE_HEAD = [
    "Nama Owner",
    "Jenis Tagihan",
    "Biaya Tagihan",
    "Denda",
    "Tanggal Tagihan Dibuat",
    "Tanggal Jatuh Tempo",
    "Tanggal Pembayaran",
    "Status Pembayaran",
];

export default function Billing({
    auth,
    errors,
    data,
    filters,
    ownerId,
    ownerName,
}) {
    const [status, setStatus] = useState("");

    const handleStatusChange = (value) => {
        setStatus(value);
    };

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
        if (type === "status") {
            setStatus(value);
        }

        router.get(
            route(route().current(), { id: ownerId }),
            {
                status: type === "status" ? value : status,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    function getPaginationUrl(baseUrl, statusQuery) {
        let url = baseUrl;
        const params = [];

        if (statusQuery) {
            params.push(`status=${encodeURIComponent(statusQuery)}`);
        }

        // Check if baseUrl already has a query parameter
        if (baseUrl.includes("?")) {
            url += "&" + params.join("&");
        } else {
            url += "?" + params.join("&");
        }

        return url;
    }

    console.log();

    const Name = ownerName;

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Billing History
                </h2>
            }
        >
            <Head title="Billing History" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full">
                    <Breadcrumbs className="ml-[-0.9rem] w-[50rem] mobile:w-full bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-60 text-primaryHover "
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("owner.report.index")}
                            className="opacity-60 text-primary font-bold"
                        >
                            Unit Owner Report
                        </Link>
                        <Link
                            href={route("owner.report.show", {
                                id: ownerId,
                            })}
                            className="opacity-100 text-primary font-bold"
                        >
                            {Name}'s Billing History
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
                                title={`${Name}'s Billing History`}
                                description={`Informasi Data Billing ${Name}`}
                                buttonLabel={"Tambah Billing"}
                                addRoute={"billing.add"}
                                label="Cari Nama Unit Owner"
                                hasFilter={true}
                                showSearch={false}
                                showAddButton={false}
                            />
                            <div className="mt-5">
                                <div className=" flex flex-wrap">
                                    <div className="w-[21rem] mr-4 tablet:w-full">
                                        <InputLabel>
                                            Status Pembyaran
                                        </InputLabel>
                                        <Select
                                            id="status"
                                            color="blue"
                                            value={status}
                                            onChange={(value) =>
                                                handleInputChange(
                                                    value,
                                                    "status"
                                                )
                                            }
                                        >
                                            <Option value="">
                                                Status Pembayaran
                                            </Option>
                                            <Option value="Pending">
                                                Pending
                                            </Option>
                                            <Option value="Success">
                                                Success
                                            </Option>
                                            <Option value="Cancel">
                                                Cancel
                                            </Option>
                                        </Select>
                                    </div>
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
                                        {data.data && data.data.length > 0 ? (
                                            data.data.map(
                                                (
                                                    {
                                                        id,
                                                        owner,
                                                        billing_type,
                                                        billing_fee,
                                                        status,
                                                        billing_date,
                                                        due_date,
                                                        fine,
                                                        paid_date,
                                                    },
                                                    index
                                                ) => {
                                                    const isLast =
                                                        index ===
                                                        data.length - 1;
                                                    const classes = isLast
                                                        ? "pl-4 py-2"
                                                        : "pl-4 py-2 border-b border-blue-gray-150";

                                                    return (
                                                        <tr
                                                            key={id}
                                                            className="bg-primary/15 hover:bg-primary/5 transition duration-300 text-black"
                                                        >
                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
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

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
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

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
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

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        className="font-normal capitalize"
                                                                    >
                                                                        {(() => {
                                                                            const today =
                                                                                new Date();
                                                                            // Extracting the date part of today's date
                                                                            const todayDate =
                                                                                new Date(
                                                                                    today.getFullYear(),
                                                                                    today.getMonth(),
                                                                                    today.getDate()
                                                                                );

                                                                            if (
                                                                                status ===
                                                                                "Success"
                                                                            ) {
                                                                                if (
                                                                                    new Date(
                                                                                        paid_date
                                                                                    ) >
                                                                                    new Date(
                                                                                        due_date
                                                                                    )
                                                                                ) {
                                                                                    return (
                                                                                        <div className="text-red-500 font-bold">
                                                                                            {new Intl.NumberFormat(
                                                                                                "id-ID",
                                                                                                {
                                                                                                    style: "currency",
                                                                                                    currency:
                                                                                                        "IDR",
                                                                                                }
                                                                                            ).format(
                                                                                                fine
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                } else {
                                                                                    return "Tidak Ada";
                                                                                }
                                                                            } else if (
                                                                                status ===
                                                                                "Pending"
                                                                            ) {
                                                                                // Extracting the date part of due_date
                                                                                const dueDate =
                                                                                    new Date(
                                                                                        due_date
                                                                                    );

                                                                                if (
                                                                                    todayDate >
                                                                                    dueDate
                                                                                ) {
                                                                                    return (
                                                                                        <div className="text-red-500 font-bold">
                                                                                            {new Intl.NumberFormat(
                                                                                                "id-ID",
                                                                                                {
                                                                                                    style: "currency",
                                                                                                    currency:
                                                                                                        "IDR",
                                                                                                }
                                                                                            ).format(
                                                                                                fine
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                } else {
                                                                                    return "Tidak Ada";
                                                                                }
                                                                            } else {
                                                                                return "Tidak Ada";
                                                                            }
                                                                        })()}
                                                                    </Typography>
                                                                </div>
                                                            </td>

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal"
                                                                >
                                                                    {moment(
                                                                        billing_date
                                                                    ).format(
                                                                        "LL"
                                                                    )}
                                                                </Typography>
                                                            </td>

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal"
                                                                >
                                                                    {moment(
                                                                        due_date
                                                                    ).format(
                                                                        "LL"
                                                                    )}
                                                                </Typography>
                                                            </td>

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal"
                                                                >
                                                                    {paid_date ? (
                                                                        moment(
                                                                            paid_date
                                                                        ).format(
                                                                            "LL"
                                                                        )
                                                                    ) : (
                                                                        <span className="text-red-500 font-bold">
                                                                            BELUM
                                                                            ADA
                                                                            PEMBAYARAN
                                                                        </span>
                                                                    )}
                                                                </Typography>
                                                            </td>

                                                            <td
                                                                className={
                                                                    classes
                                                                }
                                                            >
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
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={TABLE_HEAD.length}
                                                    className="text-center py-4"
                                                >
                                                    Belum Terdapat Transaksi
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <Pagination
                                current_page={data.current_page}
                                last_page={data.last_page}
                                prev_page_url={data.prev_page_url}
                                next_page_url={data.next_page_url}
                                status={filters.status} // Pass the status filter to the Pagination component
                                getPaginationUrl={(baseUrl) =>
                                    getPaginationUrl(baseUrl, filters.status)
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
