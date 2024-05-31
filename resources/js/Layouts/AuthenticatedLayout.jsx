import { useEffect, useState } from "react";
import { Typography, Drawer, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "@/Components/Sidebar";
import { CustomModal } from "@/Components/CustomModal";

export default function Authenticated({ auth, header, children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState(null);

    const handleOpenModal = (value) => {
        setModalValue(value);
        setModalOpen(true);
    };

    const Auth = auth.user;

    const userApartmentId = Auth.apartment_id;
    const role = Auth.role;

    useEffect(() => {
        const channel = Echo.channel("owners");
        channel.listen("OwnerChecked", (e) => {
            console.log(e.data);
            const ownerApartmentId = e.data.apartment_id;
            if (role === "SUPER ADMIN") {
                handleOpenModal(e.data);
            } else {
                if (userApartmentId === ownerApartmentId) {
                    handleOpenModal(e.data);
                }
            }
        });

        return () => {
            channel.stopListening("OwnerChecked");
        };
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col tablet:flex-col">
            <div className="fixed top-0 left-0 w-full z-10 bg-primary shadow-[0_1px_100px_#c3b0f7]">
                <div className=" flexs flex-row items-center px-4 flex justify-between">
                    <div className="flex justify-between items-center py-2 ">
                        <IconButton
                            variant="text"
                            size="lg"
                            onClick={openDrawer}
                            className="block text-white"
                        >
                            {isDrawerOpen ? (
                                <XMarkIcon className="h-8 w-8 stroke-2" />
                            ) : (
                                <Bars3Icon className="h-8 w-8 stroke-2" />
                            )}
                        </IconButton>
                        <Drawer
                            open={isDrawerOpen}
                            onClose={closeDrawer}
                            className="bg-opacity-0"
                        >
                            <Sidebar
                                user={auth.user.name}
                                classname=""
                                auth={Auth}
                            />
                        </Drawer>
                    </div>

                    <Typography className="text-textColor  font-extrabold">
                        BILLING SYSTEM
                    </Typography>
                    <div className="h-8 w-8 "></div>
                </div>
            </div>
            <CustomModal
                open={modalOpen}
                value={modalValue}
                handleClose={handleCloseModal}
            />
            <main
                className={`pt-8 ${
                    isDrawerOpen
                        ? "filter transition blur-sm duration-100"
                        : "transition duration-1000"
                }`}
            >
                {children}
            </main>
        </div>
    );
}
