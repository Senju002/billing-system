import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
    Breadcrumbs,
} from "@material-tailwind/react";
import { FolderPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import moment from "moment";
import Pagination from "@/Components/Pagination";
import PageHeader from "@/Components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
    "No Identitas",
    "Nama Owner",
    "Nomor HP",
    "Email",
    "Apartemen",
    "No Apartemen",
    "Dibuat Pada Tanggal",
    "Dibuat Oleh",
    "Edit",
];

export default function UnitOwner({ auth, errors, data, filters }) {
    const { flash } = usePage().props;

    function handleSearch(event) {
        console.log(event.target.value);
        router.get(
            route(route().current()),
            { search: event.target.value },
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    function getPaginationUrl(baseUrl, searchQuery) {
        if (searchQuery) {
            // Include the search query in the URL
            return `${baseUrl}&search=${searchQuery}`;
        } else {
            // Don't include the search query
            return baseUrl;
        }
    }

    const buttonIcon = <FolderPlusIcon strokeWidth={2} className="h-4 w-4" />;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    console.log(data.data);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Unit Owner
                </h2>
            }
        >
            <Head title="Unit Owner" />

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
                            href={route("unitowner.index")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Unit Owner
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                handleSearch={handleSearch}
                                title={"Unit Owner List"}
                                description={
                                    "Informasi Data Unit Owner pada Apartemen"
                                }
                                buttonLabel={"Tambah Unit Owner"}
                                icon={buttonIcon}
                                addRoute={"unitowner.add"}
                                label="Cari Nama Unit Owner"
                            />
                            <CardBody className="overflow-scroll px-0">
                                <table className="mt-4 mobile:mt-0 w-full min-w-max table-auto text-left border ">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-y  bg-primary p-4 "
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
                                                    identity_no,
                                                    owner_name,
                                                    phone,
                                                    email,
                                                    apartment,
                                                    room_no,
                                                    created_at,
                                                    id,
                                                    created_by,
                                                },
                                                index
                                            ) => {
                                                const isLast =
                                                    index ===
                                                    data.data.length - 1;
                                                const classes = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-150";

                                                return (
                                                    <tr
                                                        key={id}
                                                        className="hover:bg-primary/10"
                                                    >
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {
                                                                        identity_no
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
                                                                    {owner_name}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {phone}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal capitalize"
                                                                >
                                                                    {email}
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
                                                                        apartment.name
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
                                                                    {room_no}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {moment(
                                                                    created_at
                                                                ).format("LL")}
                                                            </Typography>
                                                        </td>

                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal"
                                                            >
                                                                {
                                                                    created_by.name
                                                                }
                                                            </Typography>
                                                        </td>

                                                        <td className={classes}>
                                                            <Link
                                                                href={route(
                                                                    "unitowner.edit",
                                                                    {
                                                                        id: id,
                                                                    }
                                                                )}
                                                                method="get"
                                                                data={{
                                                                    id: undefined,
                                                                }}
                                                                as="button"
                                                            >
                                                                <Tooltip
                                                                    content="Edit Unit Owner"
                                                                    animate={{
                                                                        mount: {
                                                                            scale: 1,
                                                                            y: 0,
                                                                        },
                                                                        unmount:
                                                                            {
                                                                                scale: 0,
                                                                                y: 25,
                                                                            },
                                                                    }}
                                                                    className="bg-green-600"
                                                                >
                                                                    <IconButton
                                                                        variant="fill"
                                                                        color="green"
                                                                    >
                                                                        <PencilIcon className="h-4 w-4" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>
                                                        </td>
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
                                getPaginationUrl={getPaginationUrl}
                            />
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
