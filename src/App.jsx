import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  // Função para entrar com o Google
  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  // Função para sair
  const sair = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // enviar o ID ao backend
  const login = async (uid) => {
    try {
      /*
      const response = await fetch('https://seu-backend.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseId: uid })
      });
      const data = await response.json();
      */
      console.log(`Enviado ID: ${uid}`);
    } catch (error) {
      console.error("Erro ao enviar ID ao backend", error);
    }
  };

  if (carregando) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h2>Login com Google</h2>

      {!user ? (
        // Se NÃO estiver logado
        <button
          onClick={loginGoogle}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Entrar com o Google
        </button>
      ) : (
        // Se estiver logado
        <div style={{ border: '1px solid #ccc', display: 'inline-block', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
          <h3>Bem-vindo, {user.displayName}!</h3>

          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Foto de perfil"
              style={{ width: '80px', borderRadius: '50%', display: 'block', marginBottom: '10px' }}
            />
          )}

          <p><strong>Nome:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID do Usuário:</strong> <code>{user.uid}</code></p>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => login(user.uid)}
              style={{ padding: '8px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Criar usuário
            </button>

            <button
              onClick={sair}
              style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Sair (Logout)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;