// pages/login.js
import { post } from "@/api";
import { loginSchema } from "@/schema/login";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await post({
        action: "login",
        data: { ...values },
      }).then(({ status, message }) => {
        toast.success(message);
        setLoading(false);
        if (status === "success") router.push("/ink");
      });
    } catch (error) {
      console.log("Login Error: ", error);
      setLoading(false);
    }
  };

  const formProps = useForm({
    defaultValues: { email: undefined, password: undefined },
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formProps;

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center px-2">
      <div className="w-full max-w-2xl space-y-6 rounded-xl border bg-white p-12">
        <h1 className="mb-4 text-3xl font-medium">Login</h1>
        <div className="space-y-2">
          <Input
            type="email"
            label={"Email"}
            placeholder="Enter Email"
            rest={register("email")}
            error={errors.email?.message}
          />
          <Input
            label={"Password"}
            placeholder="Enter Password"
            rest={register("password")}
            error={errors.password?.message}
          />
        </div>
        <Button
          outline
          loading={loading}
          className="my-2 !h-[42px] w-full rounded-xl font-semibold"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </div>
    </main>
  );
}
