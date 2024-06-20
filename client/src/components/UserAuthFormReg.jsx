import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const UserAuthFormReg = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/login`, {
                email,
                password
            });
            localStorage.setItem(`access_token`, response.data.access_token);
            navigateTo(`/`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"

                            />
                            <Input
                                id="password"
                                placeholder="password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                            />
                        </div>
                        <Button>
                            Sign Up
                        </Button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default UserAuthFormReg;