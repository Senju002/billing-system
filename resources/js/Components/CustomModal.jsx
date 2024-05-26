import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function CustomModal({ open, value, handleClose }) {
    return (
        <Dialog
            open={open}
            handler={handleClose}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader className="mobile:text-lg font-bold text-primary flex justify-center border-b-2 border-primaryHover mx-4">
                Emergency Request !!!
            </DialogHeader>
            <DialogBody>
                {value ? (
                    <div className="text-black grid grid-cols-2 gap-x-4 gap-y-2 mobile:text-xs">
                        <div className="font-bold">Identity No</div>
                        <div>: {value.identity_no}</div>
                        <div className="font-bold">Owner Name</div>
                        <div>: {value.owner_name}</div>
                        <div className="font-bold">Email</div>
                        <div> : {value.email}</div>
                        <div className="font-bold">Phone</div>
                        <div> : {value.phone}</div>
                        <div className="font-bold">Apartment</div>
                        <div>: {value.apartment}</div>
                        <div className="font-bold">No Apartment</div>
                        <div>: {value.room_no}</div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DialogBody>
            <DialogFooter>
                <Button
                    // variant="gradient"
                    className="bg-primary"
                    onClick={handleClose}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
