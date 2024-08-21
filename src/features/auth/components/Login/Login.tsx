import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    BackgroundImage,
} from '@mantine/core';
// import slider from '@/assets/img/sliderHome1.png';
import { useLoginMutation, LoginCredentials } from '@/features/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {
    const { accountType, setAccountType } = useAuthStore();
    const navigate = useNavigate();
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            setAccountType({
                user: {
                    id: '1'
                }
            });
            navigate('/dashboard')
        },
        onError: (e) => {
            console.log(e)
        },
    });
    const { handleSubmit, register } = useForm<LoginCredentials>();

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {!accountType ? (
                <BackgroundImage src={''} className="h-screen">
                    <Container classNames={{ root: '!mt-0 pt-20' }} size={420} my={40}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                <Title ta="center" className="mb-4">
                                    Chào mừng quay trở lại!
                                </Title>
                                <TextInput
                                    {...register('username')}
                                    label="Tên đăng nhập"
                                    placeholder="Nhập tên đăng nhập"
                                    required
                                />
                                <PasswordInput
                                    {...register('password')}
                                    label="Password"
                                    placeholder="Nhập mật khẩu"
                                    required
                                    mt="md"
                                />
                                <Group justify="space-between" mt="lg">
                                    <Checkbox label="Remember me" />
                                    <Anchor component="button" size="sm">
                                        Forgot password?
                                    </Anchor>
                                </Group>
                                <Button type="submit" fullWidth mt="xl" loading={loginMutation.isPending}>
                                    Đăng nhập
                                </Button>
                            </Paper>
                        </form>
                    </Container>
                </BackgroundImage>
            ) : (
                <Navigate to={'/dashboard'} />
            )}
        </>
    );
}