import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ISelectYear {
  value: string;
  setValue: Function;
  minWidth?: Number;
}

const SelectYear = ({ value, setValue, minWidth }: ISelectYear) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <FormControl sx={{  minWidth: 300 }}>
      <InputLabel id="demo-simple-select-helper-label">Ano</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Ano"
        onChange={handleChange}
      >
        <MenuItem value={"2019"}>2019</MenuItem>
        <MenuItem value={"2020"}>2020</MenuItem>
        <MenuItem value={"2021"}>2021</MenuItem>
        <MenuItem value={"2022"}>2022</MenuItem>
        <MenuItem value={"2023"}>2023</MenuItem>
        <MenuItem value={"2024"}>2024</MenuItem>
        <MenuItem value={"2025"}>2025</MenuItem>
        <MenuItem value={"2026"}>2026</MenuItem>
        <MenuItem value={"2027"}>2027</MenuItem>
        <MenuItem value={"2028"}>2028</MenuItem>
        <MenuItem value={"2029"}>2029</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectYear;
