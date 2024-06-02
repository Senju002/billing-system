import { useState } from "react";
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
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
    BuildingOffice2Icon,
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon,
    DocumentTextIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import ApplicationLogo from "./ApplicationLogo";

export default function Sidebar({ user, classname, auth }) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const role = auth.role;
    const apartmentId = auth.apartment_id;
    const routeName =
        role === "SUPER ADMIN"
            ? route("apartement.index")
            : route("apartement.edit", { id: apartmentId });

    return (
        <Card
            className={`h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-primary ${classname}`}
        >
            <div className="mb-2 flex items-center flex-col text-textColor gap-4 p-4">
                <Link href={route("dashboard")}>
                    <ApplicationLogo className="bg-white p-3 rounded-2xl shadow-[0_1px_30px_#E8E3E7]" />
                </Link>
                <Typography>Good Evening, {user}</Typography>
            </div>
            <List>
                <Link href={route("dashboard")}>
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 1 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem
                        className="p-0 hover:text-primary "
                        selected={open === 1}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3 group text-textColor group-hover:text-primary"
                        >
                            <ListItemPrefix>
                                <BuildingOffice2Icon className="h-5 w-5 group-hover:text-primary" />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-textColor group-hover:text-primary">
                                Master Data
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 text-textColor ">
                            {role === "SUPER ADMIN" && (
                                <Link href={route("admin.index")}>
                                    <ListItem className="hover:text-primary ">
                                        <ListItemPrefix>
                                            <ChevronRightIcon
                                                strokeWidth={3}
                                                className="h-3 w-5"
                                            />
                                        </ListItemPrefix>
                                        Admin
                                    </ListItem>
                                </Link>
                            )}
                            <Link href={routeName}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Apartment
                                </ListItem>
                            </Link>

                            <Link href={route("unitowner.index")}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Unit Owner
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <Link href={route("billing.index")}>
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <CreditCardIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Billing
                    </ListItem>
                </Link>

                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 2 ? "rotate-180" : ""
                            }`}
                        />
                    }
                >
                    <ListItem
                        className="p-0 hover:text-primary "
                        selected={open === 2}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-b-0 p-3 group text-textColor group-hover:text-primary"
                        >
                            <ListItemPrefix>
                                <DocumentTextIcon className="h-5 w-5 group-hover:text-primary" />
                            </ListItemPrefix>
                            <Typography className="mr-auto font-normal text-textColor group-hover:text-primary">
                                Report
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1 ">
                        <List className="p-0 text-textColor ">
                            <Link href={route("billing.paid.index")}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Paid Billings
                                </ListItem>
                            </Link>
                            <Link href={route("billing.unpaid.index")}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Unpaid Billings
                                </ListItem>
                            </Link>
                            <Link href={route("billing.penalties.index")}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Billings With Penalty
                                </ListItem>
                            </Link>
                            <Link href={route("owner.report.index")}>
                                <ListItem className="hover:text-primary ">
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Unit Owner Report
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>

                <hr className="my-2 border-blue-gray-50" />

                <Link href={route("profile.edit")}>
                    <ListItem className="hover:text-primary text-textColor ">
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                </Link>
                <Link href={route("logout")} method="post" as="button">
                    <ListItem className="hover:text-primary text-textColor">
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
}
