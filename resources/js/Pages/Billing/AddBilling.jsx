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
    Option,
    Select,
} from "@material-tailwind/react";
import { useState } from "react";

export default function AddBiling({ auth, ownerData }) {
    const [owner, setOwner] = useState(ownerData[0]);
    const [billingType, setBillingType] = useState("Air");

    const { data, setData, post, processing, errors } = useForm({
        billing_fee: "",
        meter_reading: "",
        billing_date: "",
        billing_type: billingType,
        fine: "",
        due_date: "",
    });

    const handleOwnerChangeChange = (value) => {
        setOwner(value);
        setData((prevValues) => ({
            ...prevValues,
            owner_id: value.value,
        }));
    };

    const handleBillingTypeChange = (value) => {
        setBillingType(value);
        setData((prevValues) => ({
            ...prevValues,
            billing_type: value,
            meter_reading: null,
        }));
    };

    // ! Handle submit
    function handleSubmit(e) {
        e.preventDefault();
        // console.warn(data);
        post("/billing/store");
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Billing Data
                </h2>
            }
        >
            <Head title="Add Billing Data" />

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
                            href={route("billing.index")}
                            className="opacity-60 text-primaryHover "
                        >
                            Billing
                        </Link>
                        <Link
                            href={route("billing.add")}
                            className="opacity-100 text-primary font-bold"
                        >
                            Add Billing
                        </Link>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-full">
                        <Card className=" p-12 h-full w-full">
                            <PageHeader
                                title={"New Billing Data"}
                                description={"Tambah Tagihan Billing yang Baru"}
                                showSearch={false}
                            />
                            <CardBody className=" px-0 h-full  ">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row justify-start tablet:flex-col ">
                                        <div className="flex flex-col w-full mr-4">
                                            <InputSelect
                                                value={owner}
                                                onChange={
                                                    handleOwnerChangeChange
                                                }
                                                options={ownerData}
                                            />
                                            {errors.owner_id && (
                                                <p className="text-red-500 text-sm ml-0 mt-3">
                                                    {errors.owner_id}
                                                </p>
                                            )}
                                        </div>

                                        <div className="w-full mr-4 tablet:mt-8">
                                            <Select
                                                label="Tipe Billing"
                                                id="billing_type"
                                                color="blue"
                                                value={billingType}
                                                onChange={
                                                    handleBillingTypeChange
                                                }
                                            >
                                                <Option value="Air">Air</Option>
                                                <Option value="Listrik">
                                                    Listrik
                                                </Option>
                                                <Option value="Maintenance">
                                                    Maintenance
                                                </Option>
                                                <Option value="Parkir">
                                                    Parkir
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start tablet:flex-col mt-8">
                                        <CustomInput
                                            label="Biaya Tagihan"
                                            id="billing_fee"
                                            value={data.billing_fee}
                                            onChange={(e) =>
                                                setData(
                                                    "billing_fee",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            errors={errors.billing_fee}
                                        />

                                        {billingType === "Air" ||
                                        billingType === "Listrik" ? (
                                            <CustomInput
                                                label="Meteran"
                                                id="meter_reading"
                                                value={data.meter_reading}
                                                onChange={(e) =>
                                                    setData(
                                                        "meter_reading",
                                                        e.target.value
                                                    )
                                                }
                                                errors={errors.meter_reading}
                                                className="tablet:mt-8"
                                                type="number"
                                            />
                                        ) : null}

                                        <CustomInput
                                            label="Tanggal Tagihan Dibuat"
                                            id="billing_date"
                                            value={data.billing_date}
                                            onChange={(e) =>
                                                setData(
                                                    "billing_date",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.billing_date}
                                            className="tablet:mt-8"
                                            type="date"
                                        />
                                    </div>

                                    <div className="flex flex-row justify-start tablet:flex-col mt-8 tablet:mt-0">
                                        <CustomInput
                                            label="Tanggal Batas Pembayaran"
                                            id="due_date"
                                            value={data.due_date}
                                            onChange={(e) =>
                                                setData(
                                                    "due_date",
                                                    e.target.value
                                                )
                                            }
                                            errors={errors.due_date}
                                            className="tablet:mt-8"
                                            type="date"
                                        />

                                        <CustomInput
                                            label="Biaya Denda Jika Lewat Batas Tagihan"
                                            id="fine"
                                            value={data.fine}
                                            onChange={(e) =>
                                                setData("fine", e.target.value)
                                            }
                                            type="number"
                                            errors={errors.fine}
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
