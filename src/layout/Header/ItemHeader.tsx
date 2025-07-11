import { Layout } from "antd";
import DrawMenu from "./components/DrawMenu";
import "./ItemHeader.css";

const { Header } = Layout;

export default function ItemHeader() {
  return (
    <Header
      style={{
        padding: "0 0px",
        background: "#b1001c",
        borderBottom: "1px solid #e8e8e8",
        height: 65, // Mantém altura fixa para alinhar com o Sidebar
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="menu_hamburguer">
        <DrawMenu />
      </div>

      <div style={{ 
        fontSize: "24px", 
        fontWeight: "bold", 
        color: "#FFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginLeft: "-15px"
      }}>
        <img 
          src="/yamahamini.png" 
          alt="Yamaha Logo" 
          style={{ 
            height: "35px",
            display: "none"
          }} 
          className="mobile-logo"
        />
      </div>

      <div>{/* Espaço reservado para ícones de usuário/notificações */}</div>
    </Header>
  );
}
