import LayoutAuth from "@/components/LayoutAuth";
import UserAuthForm from "@/components/UserAuthForm";
import Social from "../../assets/groupChat.svg"


export default function Login() {
    return (
        <LayoutAuth>

            <div className="hidden lg:flex lg:w-1/2 p-12">
                <img src={Social} alt="Social" />
            </div>
            <div className="flex w-full h-full justify-center items-center lg:w-1/2">
                <div className="mx-auto flex w-full max-w-xs flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Log In
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to Sign In
                        </p>
                    </div>
                    <UserAuthForm />

                </div>
            </div>
        </LayoutAuth>
    )
}
