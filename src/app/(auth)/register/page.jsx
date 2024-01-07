import RegisterForm from "@/components/registerForm/RegisterForm";
import styles from "./register.module.css"

const RegisterPage = () => {
    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <RegisterForm />
            </div>
        </main>
    )
}

export default RegisterPage;