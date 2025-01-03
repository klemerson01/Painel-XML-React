import "./modal.css";
import FormGroup from "@mui/material/FormGroup";
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  Switch,
} from "@mui/material";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { IClienteData } from "../interfaces/ClientesData";
import {
  EditarCliente,
  CriarCliente,
  uploadFileWithParams,
  EnviarEmail,
  Deletar,
  MudarStatusCliente,
} from "../hooks/useClientes";
import {
  cnpjMask,
  cpfMask,
  RetornarDescricaoMes,
  telefoneMask,
} from "../../utils/constantes";
import SelectMonth from "../selectMonth/SelectMonth";
import SelectYear from "../selectYear/SelectYear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { HttpStatusCode } from "axios";
import { notify } from "../../App";
import SelectSoftware from "../selectSoftware/SelectSoftware";
import { IResponseUpdload } from "../interfaces/ResponseUpload";
import { IApiResponse } from "../interfaces/ApiResponse";

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
  const [formData, setFormData] = useState<IClienteData>(() => {
    return cliente;
  });
  const [cnpjDisabled, setCnpjDisabled] = useState(false);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [file, setFile] = useState({} as File);
  const [uploading, setUploading] = useState(false);
  const [enviandoEmail, setEnvandoEmail] = useState(false);
  const [status, setStatus] = useState(false);
  const [exibirUpload, setExibirUpload] = useState(false);

  const mensagem = !status ? "Desativar" : "Desativado";

  useEffect(() => {
    if (formData.id) {
      setCnpjDisabled(true);
      setExibirUpload(true);
    }

    const now = new Date();
    setAno(now.getFullYear().toString());
    setMes(RetornarDescricaoMes(now.getMonth()));
  }, []);

  const SalvarAlteracoes = async () => {
    if (!formData.id) {
      try {
        const novoCliente = await CriarCliente(formData);
        if (novoCliente.status == HttpStatusCode.Created) {
          cbAtualizarListagemClientes(novoCliente.data);
          closeModal();
        }
      } catch (error) {
        notify("Erro no cadastro...", "error");
      }
    } else {
      try {
        const clienteAlterado = await EditarCliente(formData);
        if (clienteAlterado.status == HttpStatusCode.Created) {
          cbAtualizarListagemClientes(clienteAlterado.data);

          closeModal();
        }
      } catch (error) {
        notify("Erro no edicao...", "error");
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
      setFile(file);
    }
  };

  const handleSetSoft = (valueSoft: string) => {
    setFormData({
      ...formData,
      software: valueSoft,
    });
  };

  const uploadArquivoCliente = async () => {
    setUploading(true);
    try {
      if (ano == "" || mes == "" || file == ({} as any)) {
        notify("Preencher campos obrigatórios", "error");
        return;
      }

      const res = await uploadFileWithParams(cliente.id!!, file, {
        ano: Number(ano),
        mes: mes,
      });

      if (res.status == HttpStatusCode.Created) {
        cliente.arquivos.push({
          ano: Number(ano),
          mes: mes,
          enviado: false,
          emailEnviado: "",
          link: res.data.url,
        });
        notify(res.message, "success");
      }

      setFile({} as File);
      setMes("");
      setAno("2024");
    } finally {
      setUploading(false);
    }
  };

  const EnviarEmailParaContabilidade = async (ano: Number, mes: string) => {
    setEnvandoEmail(true);
    try {
      const res = await EnviarEmail(cliente.id ? cliente.id : "", ano, mes);

      if (res.status == HttpStatusCode.Ok) {
        cliente.arquivos.forEach((item) => {
          if (item.ano == ano && item.mes == mes) {
            item.enviado = true;
            item.emailEnviado = cliente.contador.email;
          }
        });
      }
    } finally {
      setEnvandoEmail(false);
    }
  };

  const DeletarArquivo = async (ano: Number, mes: string) => {
    setEnvandoEmail(true);
    try {
      const res = await Deletar(cliente.id ? cliente.id : "", ano, mes);

      if (res.status == HttpStatusCode.Ok) {
        cliente.arquivos.forEach((item) => {
          if (item.ano == ano && item.mes == mes) {
            cliente.arquivos.splice(cliente.arquivos.indexOf(item), 1);
          }
        });
      }
    } finally {
      setEnvandoEmail(false);
    }
  };

  const handleChangeStatus = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const res = await MudarStatusCliente(cliente.id ? cliente.id : "");

    if (res.status == HttpStatusCode.Ok) {
      cliente.ativo = !cliente.ativo;
      setFormData({
        ...formData,
        ativo: !formData.ativo,
      });
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
              <div className="rowCliente">
                <Typography variant="h6" gutterBottom>
                  Cliente
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Ativo
                  <Switch
                    checked={cliente.ativo == true}
                    onChange={handleChangeStatus}
                    name="loading"
                    color="primary"
                  />
                </Typography>
              </div>
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
                  required
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
                  value={
                    formData.cnpj.length == 11
                      ? cpfMask(formData.cnpj)
                      : cnpjMask(formData.cnpj)
                  }
                  onChange={handleChange}
                  disabled={cnpjDisabled}
                  required
                />

                <SelectSoftware
                  value={formData.software}
                  setValue={handleSetSoft}
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
                    required
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
              {exibirUpload && (
                <>
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
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Upload
                      </Typography>
                    </div>

                    <div className="upload">
                      <SelectMonth value={mes} setValue={setMes} />
                      <SelectYear value={ano} setValue={setAno} />

                      <div>
                        <label htmlFor="upload-button" className="addArquivos">
                          <Button
                            variant="contained"
                            component="span"
                            color="info"
                            startIcon={<CloudUploadIcon />}
                            sx={{ marginRight: "20px" }}
                          >
                            Adicionar arquivos
                            <input
                              type="file"
                              accept=".rar,.zip"
                              style={{ display: "none" }}
                              id="upload-button"
                              onChange={handleFileChange}
                            />
                          </Button>
                          <p style={{ fontSize: 15 }}>
                            {file ? file.name : "Nenhum arquivo selecionado"}
                          </p>
                        </label>
                      </div>

                      <div className="buttonEnviar">
                        <Button
                          variant="contained"
                          color="success"
                          endIcon={<SendIcon />}
                          onClick={uploadArquivoCliente}
                          disabled={uploading}
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
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
                      Arquivos gerados
                    </Typography>
                    <div
                      style={{
                        padding: "0",
                        maxWidth: "100%",
                        margin: "0 auto",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: "200px", // Altura máxima
                          overflowY: "auto", // Ativa a barra de rolagem vertical, se necessário
                          border: "1px solid #ccc", // Adiciona borda ao redor da tabela
                          borderRadius: "5px", // Bordas arredondadas
                        }}
                      >
                        {/* Cabeçalho da tabela */}
                        <div
                          style={{
                            display: "flex",
                            fontWeight: "bold",
                            padding: "10px",
                            borderBottom: "2px solid black",
                            backgroundColor: "#f0f0f0", // Fundo do cabeçalho
                          }}
                        >
                          <div style={{ flex: 2 }}>Mês</div>
                          <div style={{ flex: 2 }}>Ano</div>
                          <div style={{ flex: 2 }}>Link</div>
                          <div style={{ flex: 2 }}>Enviado</div>
                          <div style={{ flex: 1 }}>Enviar</div>
                          <div style={{ flex: 1 }}>Deletar</div>
                        </div>

                        {/* Renderiza os itens da lista */}
                        {[...cliente.arquivos].reverse().map((item) => (
                          <div
                            key={item.mes + item.ano.toString()}
                            style={{
                              display: "flex",
                              padding: "10px",
                              backgroundColor: item.enviado
                                ? "#d4edda"
                                : "#f8d7da",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          >
                            <div style={{ flex: 2 }}>{item.mes}</div>
                            <div style={{ flex: 2 }}>{item.ano.toString()}</div>
                            <div style={{ flex: 2 }}>
                              <a
                                style={{ fontSize: "11px" }}
                                href={item.link ?? ""}
                              >
                                Download
                              </a>
                            </div>
                            <div style={{ flex: 2 }}>
                              {item.enviado ? "Sim" : "Não"}
                            </div>
                            <div style={{ flex: 1 }}>
                              <Button
                                disabled={item.enviado == true || enviandoEmail}
                                onClick={() => {
                                  EnviarEmailParaContabilidade(
                                    item.ano,
                                    item.mes
                                  );
                                }}
                              >
                                Enviar
                              </Button>
                            </div>
                            <div style={{ flex: 1 }}>
                              <Button
                                disabled={item.enviado == true || enviandoEmail}
                                onClick={() => {
                                  DeletarArquivo(item.ano, item.mes);
                                }}
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Box>
                </>
              )}

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
        </div>
      </div>
    </div>
  );
}

export default Modal;
