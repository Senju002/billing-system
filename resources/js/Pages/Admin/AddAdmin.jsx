import CustomInput from "@/Components/CustomInput";
import InputSelect from "@/Components/InputSelect";
import PageHeader from "@/Components/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Breadcrumbs,
    Button,
    Card,
    CardBody,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";

export default function AddAdmin({ auth, apartmenetData }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        apartment_id: "",
        password: "",
    });

    const [apartment, setApartment] = useState(apartmenetData[0]);

    const handleApartmentChange = (value) => {
        setApartment(value);
        setData((prevValues) => ({
            ...prevValues,
            apartment_id: value.value,
        }));
    };

    // ! Handle submit
    function handleSubmit(e) {
        e.preventDefault();
        post("/admin/store");
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Admin
                </h2>
            }
        >
            <Head title="Add New Admin" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full h-[35rem] tablet:h-[55rem]">
                    <Breadcrumbs className="ml-[-0.9rem] w-96 bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-60 text-primaryHover "
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("admin.index")}
                            className="opacity-60 text-primaryHover "
                        >
                            Admin
                        </Link>
                        <Link
                            href={route("admin.add")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Add Admin
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                title={"New Admin Data"}
                                description={
                                    "Tambah Data Admin yang Baru ke Apartemen"
                                }
                                showSearch={false}
                            />
                            <CardBody className=" px-0 h-full  ">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col justify-start tablet:flex-col">
                                        <CustomInput
                                            label="Nama Admin"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            errors={errors.name}
                                        />

                                        <CustomInput
                                            label="Email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            errors={errors.email}
                                            className="mt-8"
                                            type="email"
                                        />

                                        <CustomInput
                                            label="Password"
                                            id="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.password}
                                            className="mt-8"
                                            type="password"
                                        />

                                        <div className="mt-8 w-full">
                                            <InputSelect
                                                value={apartment}
                                                onChange={handleApartmentChange}
                                                options={apartmenetData}
                                            />
                                            {errors.apartment_id && (
                                                <p className="text-red-500 text-sm ml-0 mt-3">
                                                    {errors.apartment_id}
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
