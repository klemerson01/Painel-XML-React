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
import { useEffect, useState } from "react";
import { IClienteData } from "../interfaces/ClientesData";
import { EditarCliente, CriarCliente } from "../hooks/useClientes";
import constantes, { cnpjMask, telefoneMask } from "../../utils/constantes";
import SelectMonth from "../selectMonth/SelectMonth";
import SelectYear from "../selectYear/SelectYear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

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
  const [cnpjDisabled, setCnpjDisabled] = useState(false);
  const [mes, setMes] = useState("Janeiro");
  const [ano, setAno] = useState("2024");

  useEffect(() => {
    if (formData.id) {
      setCnpjDisabled(true);
    }
  }, []);

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

    if (name == "telefone" || name == "cnpj") {
      const limparMascara = value.replace(/\D/g, "");

      setFormData({
        ...formData,
        [name]: limparMascara,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeContabil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "telefone") {
      const limparMascara = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        contador: {
          ...formData.contador,
          [name]: limparMascara,
        },
      });
    } else {
      setFormData({
        ...formData,
        contador: {
          ...formData.contador,
          [name]: value,
        },
      });
    }
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Verifica se há um arquivo selecionado
    if (file) {
      console.log("Arquivo selecionado:", file.name);
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
                  value={cnpjMask(formData.cnpj)}
                  onChange={handleChange}
                  disabled={cnpjDisabled}
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
                  value={telefoneMask(formData.telefone)}
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
                    value={telefoneMask(formData.contador.telefone)}
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
                  Arquivos que serão gerados:
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
                    label="SPED-FISCAL"
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
                  marginTop: 2,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                
                  <Typography variant="h6" gutterBottom>
                    Upload
                  </Typography>
                
                <div className="upload">
                  <SelectMonth  value={mes} setValue={setMes} />
                  <SelectYear value={ano} setValue={setAno} />

                  <input
                    type="file"
                    accept=".rar,.zip"
                    style={{ display: "none" }}
                    id="upload-button"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-button">
                    <Button
                      variant="contained"
                      component="span"
                      color="info"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                    </Button>
                  </label>
                </div>

                <div className="buttonEnviar">
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<SendIcon />}
                  >
                    Enviar
                  </Button>
                </div>
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
