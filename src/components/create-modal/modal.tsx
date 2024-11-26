import { flexbox, width } from "@mui/system";
import "./modal.css";
// import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { Box, TextField, Typography, FormControlLabel, Button } from "@mui/material";
import { Checkbox } from "@mui/material";

interface ModalProps {
  closeModal(): void;
}

function Modal({ closeModal }: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  
  return (
    <div className="modal-fundo" onClick={handleOverlayClick}>
      <div className="modal-body">
        <div id="modal-cliente">
          <form >
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
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="input-modal"
                  label="Fantasia"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="input-modal"
                  label="CNPJ"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="input-modal"
                  label="Software"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="input-modal"
                  label="Telefone"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="input-modal"
                  label="E-mail"
                  fullWidth
                  margin="normal"
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
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    className="input-modal"
                    label="Telefone"
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    sx={{ flex: "1 1 100%" }}
                    className="input-modal"
                    label="E-mail"
                    fullWidth
                    margin="normal"
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
                    value={"XML"}
                    label="XML"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    value={"SPED-FISCAL"}
                    label="SPED-Fiscal"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    value={"SPED-CONT"}
                    label="SPED-CONTRIBUIÇÕES"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    value={"CORRECAO"}
                    label="CORREÇÃO-SPED"
                  />
                </FormGroup>
              </Box>
              <Box sx={{
                marginTop:1,
                display: 'flex',
                justifyContent: 'end',
                width: '100%'
              }}>
              <Button onClick={closeModal}  variant="contained"> Salvar </Button>
              </Box>
            </Box>
            
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Modal;
