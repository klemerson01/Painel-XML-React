import "./modal.css";
import FormGroup from "@mui/material/FormGroup";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { IClienteData } from "../interfaces/ClientesData";
import { EditarCliente, CriarCliente } from "../hooks/useClientes";
import constantes from "../../utils/constantes";

interface ModalProps {
  closeModal(): void;
  cliente: IClienteData;
  cbAtualizarListagemClientes(clienteAlterado: IClienteData): void;
}

function Modal({
  closeModal,
  cliente,
  cbAtualizarListagemClientes,
}: ModalProps) {
  const [msgErro, setMsgErro] = useState(constantes.STRING_VAZIA);
  const [formData, setFormData] = useState<IClienteData>(() => {
    return cliente;
  });

  const SalvarAlteracoes = async () => {
    if (!formData.id) {
      try {
        const novoCliente = await CriarCliente(formData);
        if (novoCliente.status == constantes.HTTP_RESPONSE_CREATE) {
          cbAtualizarListagemClientes(novoCliente.data);
          closeModal();
        }
      } catch (error) {
        setMsgErro("Erro no cadastro...");
      }
    } else {
      try {
        const clienteAlterado = await EditarCliente(formData);
        if (clienteAlterado.status == constantes.HTTP_RESPONSE_OK) {
          cbAtualizarListagemClientes(clienteAlterado.data);
          closeModal();
        }
      } catch (error) {
        setMsgErro("Erro no cadastro...");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeContabil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contador: {
        ...formData.contador,
        [name]: value,
      },
    });
  };

  const handleTipoArquivo = (e: any, checked: boolean) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      tiposArquivo: {
        ...formData.tiposArquivo,
        [name]: checked,
      },
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal-fundo" onClick={handleOverlayClick}>
      <div className="modal-body">
        <div id="modal-cliente">
          <form>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                marginTop: 2,
                marginBottom: 4,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Cliente
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <TextField
                  className="input-modal"
                  label="Razão Social"
                  name="razao"
                  fullWidth
                  margin="normal"
                  value={formData.razao}
                  onChange={handleChange}
                />

                <TextField
                  className="input-modal"
                  label="Fantasia"
                  name="fantasia"
                  fullWidth
                  margin="normal"
                  value={formData.fantasia}
                  onChange={handleChange}
                />

                <TextField
                  className="input-modal"
                  label="CNPJ"
                  name="cnpj"
                  fullWidth
                  margin="normal"
                  value={formData.cnpj}
                  onChange={handleChange}
                />
                <TextField
                  className="input-modal"
                  label="Software"
                  name="software"
                  fullWidth
                  margin="normal"
                  value={formData.software}
                  onChange={handleChange}
                />
                <TextField
                  className="input-modal"
                  label="Telefone"
                  name="telefone"
                  fullWidth
                  margin="normal"
                  value={formData.telefone}
                  onChange={handleChange}
                />
                <TextField
                  className="input-modal"
                  label="E-mail"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Contabilidade
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <TextField
                    className="input-modal"
                    label="Contabilidade"
                    name="nome"
                    fullWidth
                    margin="normal"
                    value={formData.contador.nome}
                    onChange={handleChangeContabil}
                  />
                  <TextField
                    className="input-modal"
                    label="Telefone"
                    name="telefone"
                    fullWidth
                    margin="normal"
                    value={formData.contador.telefone}
                    onChange={handleChangeContabil}
                  />

                  <TextField
                    sx={{ flex: "1 1 100%" }}
                    className="input-modal"
                    label="E-mail"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formData.contador.email}
                    onChange={handleChangeContabil}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Arquivos
                </Typography>

                <FormGroup
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    value={formData.tiposArquivo.xml}
                    name="xml"
                    checked={formData.tiposArquivo.xml && true}
                    label="XML"
                    onChange={handleTipoArquivo}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="sped"
                    checked={formData.tiposArquivo.sped && true}
                    value={formData.tiposArquivo.sped}
                    label="SPED-Fiscal"
                    onChange={handleTipoArquivo}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="spedFederal"
                    checked={formData.tiposArquivo.spedFederal && true}
                    value={formData.tiposArquivo.spedFederal}
                    label="SPED-CONTRIBUIÇÕES"
                    onChange={handleTipoArquivo}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="correcao"
                    checked={formData.tiposArquivo.correcao && true}
                    value={formData.tiposArquivo.correcao}
                    label="CORREÇÃO-SPED"
                    onChange={handleTipoArquivo}
                  />
                </FormGroup>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <Button
                  onClick={SalvarAlteracoes}
                  variant="contained"
                  size="large"
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </form>
          {msgErro}
        </div>
      </div>
    </div>
  );
}

export default Modal;
