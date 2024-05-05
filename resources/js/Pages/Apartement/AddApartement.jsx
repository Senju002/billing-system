import PageHeader from "@/Components/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    Button,
    Card,
    CardBody,
    Input,
} from "@material-tailwind/react";

export default function AddApartement({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
    });

    // ! Handle submit
    function handleSubmit(e) {
        e.preventDefault();
        post("/apartement/store");
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Apartment
                </h2>
            }
        >
            <Head title="Add Apartement" />

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
                            href={route("apartement.index")}
                            className="opacity-60 text-primaryHover "
                        >
                            Apartment
                        </Link>
                        <Link
                            href={route("apartement.add")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Add Apartment
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                title={"New Apartement Data"}
                                description={
                                    "Tambah Informasi Apartemen yang Baru"
                                }
                                label="Cari Nama Apartemen"
                                showSearch={false}
                            />
                            <CardBody className=" px-0 h-full  ">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row justify-start tablet:flex-col">
                                        <div className="flex flex-col w-full mr-4">
                                            <div className="lg:w-full ml-0 ">
                                                <Input
                                                    label="Nama Apartemen"
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    color="blue"
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="text-red-500 text-sm ml-0 mt-3">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col w-full mr-4 tablet:mt-8">
                                            <div className="lg:w-full ml-0 ">
                                                <Input
                                                    label="Alamat"
                                                    id="address"
                                                    value={data.address}
                                                    onChange={(e) =>
                                                        setData(
                                                            "address",
                                                            e.target.value
                                                        )
                                                    }
                                                    color="blue"
                                                />
                                            </div>
                                            {errors.address && (
                                                <p className="text-red-500 text-sm ml-0 mt-3">
                                                    {errors.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-row mt-8">
                                        <div className="flex w-max gap-4 ml-0">
                                            <Button
                                                variant="fill"
                                                onClick={handleSubmit}
                                                className="bg-green-500"
                                                loading={processing}
                                            >
                                                Tambah Data
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
