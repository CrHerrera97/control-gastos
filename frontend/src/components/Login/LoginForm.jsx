import useLogin from "../../hooks/gastos/auth/useLogin";

const LoginForm = () => {

    const { entrar, respuesta, error } = useLogin();

    const login = async (event) => {
        event.preventDefault();
        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const res = await entrar( correo, password );

        console.log(respuesta.token)

        if(respuesta){
            localStorage.setItem('x-token',respuesta.token)
            window.location.href = "/";
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Login</h2>
                <form>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoComplete="off"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button
                        onClick={login}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}



export default LoginForm;