import Login from "@/features/auth/components";
import { useAuthStore } from "@/store/authStore";
import { ActionIcon, Button, Menu, MenuTarget } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const { accountType, reset } = useAuthStore();
  // const [opened, setOpened] = useState(false);

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
          <Button
            leftSection={<LuUsers />}
            onClick={() => (!accountType ? onClickLogin() : reset())}
          >
            {!accountType ? "Đăng nhập" : "Đăng xuất"}
          </Button>

          <Menu>
            <MenuTarget>
              <ActionIcon size="lg">
                <IoMenu size={24} />
              </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
              <Menu.Item>
                <div className="flex items-center gap-x-3">
                  <FaRegUser size={20} />
                  <Link to="/manage/profile">Thông tin cá nhân</Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex items-center gap-x-3">
                  <FaRegUser size={20} />
                  <Link to="/manage/booking">Quản lý booking</Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex items-center gap-x-3">
                  <FaRegUser size={20} />
                  <Link to="/manage/payment">Quản lý thanh toán</Link>
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
}
