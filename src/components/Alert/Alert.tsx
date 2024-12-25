'use client'
import { useAlert } from "@/hooks/useAlert"
import { Alert, Snackbar } from "@mui/material"
import { useEffect } from "react"

export const AlertPopUp = () => {

    const { open, message, hideAlert, color } = useAlert()

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (open) {
            timer = setTimeout(() => {
                hideAlert()
            }, 6000)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [open, hideAlert])

    return (
        <Snackbar 
            anchorOrigin={{ 
                vertical: 'bottom', 
                horizontal: 'left' 
            }}
            autoHideDuration={6000}
            message={message}
            open={open}
        >
            <Alert
                onClose={hideAlert}
                severity={color}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    )
}