import CustomInput from "@/Components/CustomInput";
import PageHeader from "@/Components/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    Button,
    Card,
    CardBody,
    Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditApartement({ auth, apartementData }) {
    const { data, setData, post, processing, errors } = useForm({
        name: apartementData.name,
        address: apartementData.address,
    });

    const { flash } = usePage().props;

    const dataID = apartementData.id;
    const role = auth.user.role;

    // ! Handle submit
    function handleSubmit(e) {
        e.preventDefault();
        post(`/apartement/${dataID}/update`);
    }

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Apartment
                </h2>
            }
        >
            <Head title="Edit Apartment" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full">
                    <Breadcrumbs className="ml-[-0.9rem] w-96 bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-60 text-primaryHover "
                        >
                            Dashboard
                        </Link>
                        {role === "SUPER ADMIN" && (
                            <>
                                <Link
                                    href={route("apartement.index")}
                                    className="opacity-60 text-primaryHover"
                                >
                                    Apartment
                                </Link>
                            </>
                        )}

                        <Link
                            href={route("apartement.edit", { id: dataID })}
                            className="opacity-100 text-primary font-bold"
                        >
                            Edit Apartment
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                title={"Edit Apartement Data"}
                                description={"Edit Informasi Apartemen"}
                                label="Cari Nama Apartemen"
                                showSearch={false}
                            />
                            <CardBody className=" px-0 h-full  ">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row justify-start tablet:flex-col">
                                        <CustomInput
                                            label="Nama Apartemen"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            errors={errors.name}
                                        />

                                        <CustomInput
                                            label="Alamat"
                                            id="address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.address}
                                            className="tablet:mt-8"
                                        />
                                    </div>

                                    <div className="flex flex-row mt-8">
                                        <div className="flex w-max gap-4 ml-0">
                                            <Button
                                                variant="fill"
                                                onClick={handleSubmit}
                                                className="bg-green-500"
                                                loading={processing}
                                            >
                                                Edit Data
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
