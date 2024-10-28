import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";

export default function NexxusLogin() {
    const [showPopup, setShowPopup] = useState(false);
    const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);
    const [showCreateAccountDetailsPopup, setShowCreateAccountDetailsPopup] =
        useState(false);
    const [showPasswordCreationPopup, setShowPasswordCreationPopup] =
        useState(false);

    const SignInPopup = ({ onClose }) => {
        const [inputFocused, setInputFocused] = useState(false);
        const [showPasswordStep, setShowPasswordStep] = useState(false);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-black rounded-2xl p-8 w-full max-w-md relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <div className="w-10 h-10 mx-auto mb-4">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        {showPasswordStep ? "Enter your password" : "Sign in to NEXXUS"}
                    </h2>
                    {!showPasswordStep ? (
                        <Input
                            type="text"
                            placeholder="Phone, email, or username"
                            className={`bg-black text-white border-2 ${inputFocused ? "border-[#1d9bf0]" : "border-gray-700"
                                } mb-4`}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    ) : (
                        <div>
                            <Input
                                type="text"
                                value={username}
                                disabled
                                className="bg-gray-800 text-gray-400 mb-2"
                            />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className={`bg-black text-white border-2 ${inputFocused ? "border-[#1d9bf0]" : "border-gray-700"
                                        } pr-16`}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1d9bf0]"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    )}
                    <Button
                        className="w-full bg-white text-black hover:bg-gray-200 mb-4"
                        onClick={() => {
                            if (!showPasswordStep) {
                                setShowPasswordStep(true);
                            } else {
                                console.log("Logging in with:", username, password);
                                onClose();
                            }
                        }}
                    >
                        {showPasswordStep ? "Log In" : "Next"}
                    </Button>
                    <Button variant="outline" className="w-full mb-4">
                        Forgot password?
                    </Button>
                    <p className="text-center text-white">
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="text-[#1d9bf0] hover:underline"
                            onClick={() => {
                                onClose();
                                setShowCreateAccountPopup(true);
                            }}
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        );
    };

    const CreateAccountPopup = ({ onClose }) => {
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-black rounded-2xl p-8 w-full max-w-[440px] relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <div className="w-10 h-10 mx-auto mb-4">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Join NEXXUS today
                    </h2>
                    <Button className="w-full bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white mb-4 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign up with Google
                    </Button>
                    <div className="text-center text-white my-4">or</div>
                    <Button
                        className="w-full bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white mb-4"
                        onClick={() => {
                            onClose();
                            setShowCreateAccountDetailsPopup(true);
                        }}
                    >
                        Create account
                    </Button>
                    <p className="text-xs text-gray-500 mb-4">
                        By signing up, you agree to the{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Privacy Policy
                        </a>
                        , including{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Cookie Use
                        </a>
                        .
                    </p>
                    <p className="text-center text-white">
                        Have an account already?{" "}
                        <a
                            href="#"
                            className="text-[#1d9bf0] hover:underline"
                            onClick={() => {
                                onClose();
                                setShowPopup(true);
                            }}
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        );
    };

    const CreateAccountDetailsPopup = ({ onClose }) => {
        const [name, setName] = useState("");
        const [phone, setPhone] = useState("");
        const [useEmail, setUseEmail] = useState(false);
        const [month, setMonth] = useState("");
        const [day, setDay] = useState("");
        const [year, setYear] = useState("");
        const [phoneError, setPhoneError] = useState(null);

        const handlePhoneChange = (e) => {
            const phoneRegex = /^\d{10}$/; // 10 digit Indian phone number
            if (phoneRegex.test(e.target.value)) {
                setPhoneError(null);
            } else {
                setPhoneError("Please enter a valid 10-digit Indian phone number");
            }
            setPhone(e.target.value);
        };

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-black rounded-2xl p-8 w-full max-w-md relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <div className="w-10 h-10 mx-auto mb-4">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Create your account
                    </h2>
                    <Input
                        type="text"
                        placeholder="Name"
                        className="bg-black text-white border-gray-700 mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type={useEmail ? "email" : "tel"}
                        placeholder={
                            useEmail ? "example@gmail.com" : "Phone (10-digit Indian number)"
                        }
                        className="bg-black text-white border-gray-700 mb-4"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    {phoneError && (
                        <p className="text-red-500 text-xs mb-4">{phoneError}</p>
                    )}
                    <a
                        href="#"
                        className="text-[#1d9bf0] text-sm hover:underline mb-4 block"
                        onClick={(e) => {
                            e.preventDefault();
                            setUseEmail(!useEmail);
                        }}
                    >
                        {useEmail ? "Use phone instead" : "Use email instead"}
                    </a>
                    <p className="text-sm text-gray-400 mb-1">Date of Birth</p>
                    <p className="text-sm text-gray-400 mb-4">
                        This will not be shown publicly. Confirm your own age, even if this
                        account is for a business, a pet, or something else.
                    </p>
                    <div className="flex justify-between mb-4">
                        <Select onValueChange={setMonth}>
                            <SelectTrigger className="w-[45%] bg-black text-white border-gray-700">
                                <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((m, index) => (
                                    <SelectItem key={index} value={m}>
                                        {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setDay}>
                            <SelectTrigger className="w-[25%] bg-black text-white border-gray-700">
                                <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                    <SelectItem key={d} value={d.toString()}>
                                        {d}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setYear}>
                            <SelectTrigger className="w-[25%] bg-black text-white border-gray-700">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(
                                    { length: 100 },
                                    (_, i) => new Date().getFullYear() - i
                                ).map((y) => (
                                    <SelectItem key={y} value={y.toString()}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        className="w-full bg-white text-black hover:bg-gray-200"
                        onClick={() => {
                            onClose();
                            setShowPasswordCreationPopup(true);
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    };

    const PasswordCreationPopup = ({ onClose }) => {
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [passwordError, setPasswordError] = useState(null);

        const handlePasswordChange = (e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
            if (newPassword.length < 8) {
                setPasswordError("Password must be at least 8 characters long");
            } else {
                setPasswordError(null);
            }
        };

        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                onClick={onClose}
            >
                <div
                    className="bg-black rounded-2xl p-8 w-full max-w-md relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={onClose}
                    >
                        ×
                    </button>
                    <div className="w-10 h-10 mx-auto mb-4">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </g>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        You'll need a password
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Make sure it's 8 characters or more
                    </p>
                    <div className="relative mb-4">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-black text-white border-gray-700 pr-16"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1d9bf0]"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs mb-4">{passwordError}</p>
                    )}
                    <p className="text-xs text-gray-500 mb-4">
                        By signing up, you agree to the{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Privacy Policy
                        </a>
                        , including{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Cookie Use
                        </a>
                        . NEXXUS may use your contact information, including your email
                        address and phone number for purposes outlined in our Privacy
                        Policy, like keeping your account secure and personalizing our
                        services, including ads.{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Learn more
                        </a>
                        . Others will be able to find you by email or phone number, when
                        provided, unless you choose otherwise{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            here
                        </a>
                        .
                    </p>
                    <Button
                        className={`w-full ${password.length >= 8
                                ? "bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
                                : "bg-gray-700 text-gray-300"
                            }`}
                        disabled={password.length < 8}
                        onClick={() => {
                            if (password.length >= 8) {
                                console.log("Account created with password:", password);
                                onClose();
                            }
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex bg-black text-white font-sans relative overflow-hidden">
            <div className="w-1/2 flex items-center justify-center">
                <h1 className="text-9xl font-bold tracking-tighter">NEXXUS</h1>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <div className="max-w-sm w-full">
                    <h2 className="text-6xl font-bold mb-8">Happening now</h2>
                    <h3 className="text-3xl font-bold mb-8">Join today.</h3>
                    <Button className="w-full mb-4 bg-white text-black hover:bg-gray-200 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in as Roni
                    </Button>
                    <Button
                        className="w-full mb-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white"
                        onClick={() => setShowCreateAccountPopup(true)}
                    >
                        Create account
                    </Button>
                    <p className="text-xs text-gray-500 mb-4">
                        By signing up, you agree to the Terms of Service and Privacy Policy,
                        including Cookie Use.
                    </p>
                    <p className="font-bold mb-4">Already have an account?</p>
                    <Button
                        variant="outline"
                        className="w-full border border-gray-700 text-[#1d9bf0] hover:bg-[#031018]"
                        onClick={() => setShowPopup(true)}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
            <footer className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-500">
                <nav className="flex flex-wrap justify-center gap-3">
                    {[
                        "About",
                        "Help Center",
                        "Terms of Service",
                        "Privacy Policy",
                        "Cookie Policy",
                        "Ads info",
                        "Blog",
                        "Status",
                        "Careers",
                        "Brand Resources",
                        "Advertising",
                        "Marketing",
                        "Twitter for Business",
                        "Developers",
                        "Directory",
                        "Settings",
                    ].map((link, index) => (
                        <a key={index} href="#" className="hover:underline">
                            {link}
                        </a>
                    ))}
                    <span>© 2023 NEXXUS, Inc.</span>
                </nav>
            </footer>
            {showPopup && <SignInPopup onClose={() => setShowPopup(false)} />}
            {showCreateAccountPopup && (
                <CreateAccountPopup onClose={() => setShowCreateAccountPopup(false)} />
            )}
            {showCreateAccountDetailsPopup && (
                <CreateAccountDetailsPopup
                    onClose={() => setShowCreateAccountDetailsPopup(false)}
                />
            )}
            {showPasswordCreationPopup && (
                <PasswordCreationPopup
                    onClose={() => setShowPasswordCreationPopup(false)}
                />
            )}
        </div>
    );
}
