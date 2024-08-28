import { TextInput, PasswordInput, Checkbox, Anchor, Title, Group, Button } from "@mantine/core";
// import slider from '@/assets/img/sliderHome1.png';
import {
  useLoginMutation,
  LoginCredentials,
  RegisterCredentials,
  useRegisMutation,
} from "@/features/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const { setAccountType } = useAuthStore();
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setAccountType(data);
      onLoginSuccess();
    },
    onError: () => {
      toast.error("Đăng nhập thất bại, vui lòng thử lại");
    },
  });
  const regisMuatation = useRegisMutation({
    onSuccess: () => {
      toast.success("Đăng ký tài khoản thành công");
      setIsLogin(true);
    },
    onError: () => {
      toast.error("Đăng ký  thất bại, vui lòng thử lại");
    },
  });

  const { handleSubmit, register, reset } = useForm<RegisterCredentials | LoginCredentials>();

  useEffect(() => {
    reset();
  }, [isLogin]);

  const onSubmit: SubmitHandler<LoginCredentials | RegisterCredentials> = async (data) => {
    if (!isLogin) {
      regisMuatation.mutate({
        ...(data as any),
        isActive: true,
        createdBy: "admin",
        role: "customer",
      });
    } else {
      loginMutation.mutate(data);
    }
  };
  return (
    <form className="pb-4 px-6" onSubmit={handleSubmit(onSubmit)}>
      <Title ta="center" className="mb-4">
        {isLogin ? "Chào mừng quay trở lại!" : "Đăng ký tài khoản"}
      </Title>
      {isLogin ? (
        <>
          <TextInput
            {...register("username")}
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            required
          />
          <PasswordInput
            {...register("password")}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            required
            mt="md"
          />
        </>
      ) : (
        <>
          <TextInput
            {...register("username")}
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            required
          />
          <PasswordInput
            {...register("password")}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            required
            mt="md"
          />
          <TextInput
            {...register("customerName")}
            label="Họ và tên"
            placeholder="Nhập tên"
            required
            mt="md"
          />
          <TextInput
            {...register("phone")}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            required
            mt="md"
          />
          <TextInput
            {...register("email")}
            label="Email"
            placeholder="Nhập email"
            required
            mt="md"
          />
        </>
      )}
      <Group justify="space-between" mt="lg">
        <Checkbox label="Nhớ mật khẩu" />
        <Anchor onClick={() => setIsLogin(!isLogin)} type="button" component="button" size="sm">
          {isLogin ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"}
        </Anchor>
      </Group>
      <Button
        disabled={loginMutation.isPending || regisMuatation.isPending}
        type="submit"
        fullWidth
        mt="xl"
        loading={loginMutation.isPending}
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </Button>
    </form>
  );
}
