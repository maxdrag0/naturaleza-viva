import { useAuth } from "../../contexts/AuthContext";
import { logoutUser } from "../../services/firebase/authFirebase";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Cargando perfil...</div>;

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Nombre:</span>
            <span className="info-value">{user.displayName || "Usuario"}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Rol:</span>
            <span className="info-value profile-role">{role === "admin" ? "Administrador" : "Comprador"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
