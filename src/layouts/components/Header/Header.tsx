import Login from "@/features/auth/components";
import { useAuthStore } from "@/store/authStore";
import { ActionIcon, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";

export default function Header() {
  const { accountType, reset } = useAuthStore();

  const onClickLogin = useCallback(() => {
    modals.open({
      radius: "md",
      children: <Login onLoginSuccess={() => modals.closeAll()} />,
    });
  }, []);

  return (
    <header className="sticky top-0 right-0 bg-[#36988b] z-50">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-x-4">
          <Link to="/">
            <img src="logo.png" className="w-16 h-16" />
          </Link>
        </div>
        <div className="flex gap-x-4">
          {!accountType ? (
            <Button leftSection={<LuUsers />} onClick={() => onClickLogin()}>
              Đăng nhập
            </Button>
          ) : (
            <Button variant="light" color="red.6" onClick={() => reset()}>
              Đăng xuất
            </Button>
          )}
          <ActionIcon variant="light" size="lg">
            <IoMenu size={24} />
          </ActionIcon>
        </div>
      </div>
    </header>
  );
}
