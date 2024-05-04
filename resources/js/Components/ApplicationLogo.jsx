import Logo from "@/../../resources/images/okgo.png";

export default function ApplicationLogo({ className }) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img src={Logo} alt="logo" className="w-1/4" />
        </div>
    );
}
