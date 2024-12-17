import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EnumFiltro } from "../../utils/constantes";

interface ISelectFilter {
  value: string;
  setValue: Function;
  minWidth?: Number;
}

const SelectFilter = ({ value, setValue, minWidth }: ISelectFilter) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <FormControl sx={{ minWidth: 300 }}>
      <InputLabel id="demo-simple-select-helper-label">Filtro</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Filtro"
        onChange={handleChange}
      >
        <MenuItem value={EnumFiltro.TODOS}>Todos</MenuItem>
        <MenuItem value={EnumFiltro.GERADOS}>Gerados</MenuItem>
        <MenuItem value={EnumFiltro.NAO_GERADOS}>Não Gerados</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
