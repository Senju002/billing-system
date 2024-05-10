import CustomInput from "@/Components/CustomInput";
import InputSelect from "@/Components/InputSelect";
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
import { useState } from "react";

export default function AddUnitOwner({ auth, apartmenetData }) {
    const { data, setData, post, processing, errors } = useForm({
        owner_name: "",
        phone: "",
        email: "",
        identity_no: "",
        room_no: "",
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
        post("/unit-owner/store");
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
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full h-[35rem] tablet:h-[55rem]">
                    <Breadcrumbs className="ml-[-0.9rem] w-96 bg-transparent">
                        <Link
                            href={route("dashboard")}
                            className="opacity-60 text-primaryHover "
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("unitowner.index")}
                            className="opacity-60 text-primaryHover "
                        >
                            Unit Owner
                        </Link>
                        <Link
                            href={route("unitowner.add")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Add Unit Owner
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                title={"New Unit Owner Data"}
                                description={
                                    "Tambah Informasi Unit Owner yang Baru"
                                }
                                showSearch={false}
                            />
                            <CardBody className=" px-0 h-full  ">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row justify-start tablet:flex-col">
                                        <CustomInput
                                            label="Nama Owner"
                                            id="owner_name"
                                            value={data.owner_name}
                                            onChange={(e) =>
                                                setData(
                                                    "owner_name",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.owner_name}
                                        />

                                        <CustomInput
                                            label="Nomor HP"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            errors={errors.phone}
                                            className="tablet:mt-8"
                                        />

                                        <CustomInput
                                            label="Email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            errors={errors.email}
                                            className="tablet:mt-8"
                                        />
                                    </div>

                                    <div className="flex flex-row justify-start tablet:flex-col mt-8">
                                        <div className="flex flex-col w-full mr-4">
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

                                        <CustomInput
                                            label="Nomor Identitas"
                                            id="identity_no"
                                            value={data.identity_no}
                                            onChange={(e) =>
                                                setData(
                                                    "identity_no",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.identity_no}
                                            className="tablet:mt-8"
                                        />

                                        <CustomInput
                                            label="Nomor Apartemen"
                                            id="room_no"
                                            value={data.room_no}
                                            onChange={(e) =>
                                                setData(
                                                    "room_no",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.room_no}
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
