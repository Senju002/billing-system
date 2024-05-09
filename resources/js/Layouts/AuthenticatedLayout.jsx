import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Drawer,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({ auth, header, children }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-row tablet:flex-col">
            <Sidebar
                user={auth.user.name}
                classname=" tablet:hidden sticky top-0"
            />

            <>
                <IconButton
                    variant="text"
                    size="lg"
                    onClick={openDrawer}
                    className="hidden tablet:block bg-red-500"
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
                    className="desktop:hidden"
                >
                    <Sidebar user={auth.user.name} classname="desktop:hidden" />
                </Drawer>
            </>

            <main className="w-full overflow-auto">{children}</main>
        </div>
    );
}
