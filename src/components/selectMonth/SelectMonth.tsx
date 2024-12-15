import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ISelectMonth {
  value: string;
  setValue: Function;
  minWidth?: Number;
}

const SelectMonth = ({ value, setValue, minWidth }: ISelectMonth) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="demo-simple-select-helper-label">Mês</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Mes"
        onChange={handleChange}
      >
        <MenuItem value={"Janeiro"}>Janeiro</MenuItem>
        <MenuItem value={"Fevereiro"}>Fevereiro</MenuItem>
        <MenuItem value={"Marco"}>Março</MenuItem>
        <MenuItem value={"Abril"}>Abril</MenuItem>
        <MenuItem value={"Maio"}>Maio</MenuItem>
        <MenuItem value={"Junho"}>Junho</MenuItem>
        <MenuItem value={"Julho"}>Julho</MenuItem>
        <MenuItem value={"Agosto"}>Agosto</MenuItem>
        <MenuItem value={"Setembro"}>Setembro</MenuItem>
        <MenuItem value={"Outubro"}>Outubro</MenuItem>
        <MenuItem value={"Novembro"}>Novembro</MenuItem>
        <MenuItem value={"Dezembro"}>Dezembro</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectMonth;
