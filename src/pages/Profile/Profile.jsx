import { useAuth } from "../../contexts/AuthContext";
import { logoutUser, updateUserData } from "../../services/firebase/authFirebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./Profile.css";

const Profile = () => {
  const { user, userData, role, loading, reloadUserData } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const navigate = useNavigate();

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);

  useEffect(() => {
    if (userData?.telefono) {
      setPhoneInput(userData.telefono);
    }
  }, [userData]);

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

  const handleSavePhone = async () => {
    if (!phoneInput.trim()) {
      alert("El teléfono no puede estar vacío");
      return;
    }
    setSavingPhone(true);
    try {
      await updateUserData(user.uid, { telefono: phoneInput });
      await reloadUserData();
      setIsEditingPhone(false);
    } catch (error) {
      alert("Error al guardar el teléfono");
    } finally {
      setSavingPhone(false);
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
          <div className="info-group">
            <span className="info-label">Teléfono:</span>
            <div className="info-value phone-edit-container">
              {isEditingPhone ? (
                <>
                  <input 
                    type="tel" 
                    value={phoneInput} 
                    onChange={(e) => setPhoneInput(e.target.value)} 
                    placeholder="Ej: 5491112345678"
                    className="phone-input"
                  />
                  <button onClick={handleSavePhone} disabled={savingPhone} className="btn-save-phone">
                    {savingPhone ? "Guardando..." : "Guardar"}
                  </button>
                  <button onClick={() => setIsEditingPhone(false)} disabled={savingPhone} className="btn-cancel-phone">
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>{userData?.telefono || "No especificado"}</span>
                  <button onClick={() => setIsEditingPhone(true)} className="btn-edit-phone">
                    Editar
                  </button>
                </>
              )}
            </div>
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
