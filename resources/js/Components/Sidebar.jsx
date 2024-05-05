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
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import ApplicationLogo from "./ApplicationLogo";

export default function Sidebar({ user, classname }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

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
                            <Link href={route("apartement.index")}>
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
                    <Link href={route("profile.edit")}>
                        <ListItem className="hover:text-primary text-textColor ">
                            <ListItemPrefix>
                                <CreditCardIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Billing
                        </ListItem>
                    </Link>
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
                <Link href={route("logout")} method="post">
                    {" "}
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
