import { Metadata } from "next";
import RecoverPasswordForm from "./components/recover-password.form";


export const metadata: Metadata = {
  title: "Recover Password | Product Admin",
  description: "We will send you an email so you can recover your password",
};

export default function ForgotPasswordPage() {
  return(
    <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
      <RecoverPasswordForm />
    </div>
  </div>
  )
}