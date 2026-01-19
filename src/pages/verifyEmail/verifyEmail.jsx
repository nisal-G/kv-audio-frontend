import axios from "axios";
import { useEffect } from "react";

export default function VerifyEmail() {

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("OTP sent successfully:", response.data);
        }).catch(error => {
            console.error("Failed to send OTP:", error);
        });
    }, [token]);

    return (
        <div>
            <h2>Please verify your email address</h2>
            <p>An OTP has been sent to your registered email address. Please check your inbox and spam folder.</p>
            <p>Follow the instructions in the email to complete the verification process.</p>
        
        </div>
    )
}
