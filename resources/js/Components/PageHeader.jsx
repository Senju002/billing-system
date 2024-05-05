import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import {
    Button,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

export default function PageHeader({
    handleSearch,
    title,
    description,
    buttonLabel,
    icon,
    showSearch = true,
    addRoute = "users",
    hasFilter = false,
    label = "Search",
}) {
    return (
        <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none ml-[0rem]"
        >
            <div className="mb-8 flex items-center justify-between gap-8 border-b-2 border-primaryHover">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" className="text-primary">
                            {title}
                        </Typography>
                        <Typography className="mt-1 font-normal text-primary">
                            {description}
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row "></div>
                </div>
            </div>
            {showSearch ? (
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row tablet:items-start">
                    <div
                        className={
                            hasFilter ? "w-[51.7rem]" : "w-full md:w-72 border"
                        }
                    >
                        <Input
                            label={label}
                            icon={<MagnifyingGlassIcon className="h-5 w-5 " />}
                            onChange={handleSearch}
                        />
                    </div>
                    <Link href={route(addRoute)} className=" mobile:w-full">
                        <Button
                            className="flex items-center gap-3 bg-green-500  mobile:justify-center mobile:mt-2 mobile:w-full"
                            variant="fill"
                            size="xl"
                        >
                            {icon} {buttonLabel}
                        </Button>
                    </Link>
                </div>
            ) : null}
        </CardHeader>
    );
}
