import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
import { useState } from "react";
  
  interface ISelectSoftware {
    value: string;
    setValue: Function;
    minWidth?: Number;
    
  }
import "./selectSoftware.css"

import {softwares} from '../../utils/constantes'
  
  const SelectSoftware = ({ value, setValue,  minWidth }: ISelectSoftware) => {
    const [soft, setSoft] = useState(softwares);


    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
    };
   

    return (
      <FormControl margin="normal" className="select">
        <InputLabel id="demo-simple-select-helper-label">Software</InputLabel>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Software"
          onChange={handleChange}
          className="teste"
          
        >
            {soft?.map((value) => {
                return(
                    <MenuItem value={value}>{value}</MenuItem>
                )
                
            })}

          
        </Select>
      </FormControl>
    );
  };
  
  export default SelectSoftware;
  