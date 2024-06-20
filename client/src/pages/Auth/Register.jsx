import LayoutAuth from "@/components/LayoutAuth";
import UserAuthFormReg from "@/components/UserAuthFormReg";
import Social from "../../assets/groupChat.svg"


export default function Register() {
    return (
        <LayoutAuth>

            <div className="hidden lg:flex lg:w-1/2 p-12">
                <img src={Social} alt="Social" />
            </div>
            <div className="flex w-full h-full justify-center items-center lg:w-1/2">
                <div className="mx-auto flex w-full max-w-xs flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <UserAuthFormReg />

                </div>
            </div>
        </LayoutAuth>
    )
}
