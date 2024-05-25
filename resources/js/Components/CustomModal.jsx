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
            <DialogHeader>Emergency Request.</DialogHeader>
            <DialogBody>
                {value ? (
                    <div>
                        <p>
                            <strong>Identity No:</strong> {value.identity_no}
                        </p>
                        <p>
                            <strong>Owner Name:</strong> {value.owner_name}
                        </p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
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
