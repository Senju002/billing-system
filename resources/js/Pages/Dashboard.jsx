import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { Breadcrumbs } from "@material-tailwind/react";

export default function Dashboard({ auth, errors }) {
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
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 w-full">
                    <Breadcrumbs>
                        <a href="#" className="opacity-60">
                            Dashboard
                        </a>
                        <a href="#" className="opacity-60">
                            Apartement
                        </a>
                        <a href="#"></a>
                    </Breadcrumbs>
                    <div className="bg-white overflow-hidden sm:rounded-lg shadow-[0_1px_100px_#c3b0f7] h-screen">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <Button>Logout</Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
