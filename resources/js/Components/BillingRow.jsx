import { Typography } from "@material-tailwind/react";

export default function BillingRow({ billing_fee, fine, due_date, classes }) {
    const today = new Date();
    const parsedDueDate = new Date(due_date);

    // Strip the time part to compare only dates
    today.setHours(0, 0, 0, 0);
    parsedDueDate.setHours(0, 0, 0, 0);

    const isOverdue = today > parsedDueDate;

    const displayFee = isOverdue ? billing_fee + fine : billing_fee;

    return (
        <td className={classes}>
            <div className="flex flex-col">
                <Typography variant="small" className="font-normal capitalize">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(displayFee)}
                </Typography>
            </div>
        </td>
    );
}
