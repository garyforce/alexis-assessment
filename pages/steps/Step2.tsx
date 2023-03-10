import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, skills: readonly string[], theme: Theme) {
  return {
    fontWeight:
      skills.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default ({ handleSubmitData }: any) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [college, setCollege] = useState<string>("");
  const [period, setPeriod] = useState<number>(0);
  const theme = useTheme();

  const handleSkillChange = (event: SelectChangeEvent<typeof skills>) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const handleCollegeChange = (event: SelectChangeEvent) => {
    setCollege(event.target.value);
  };
  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    if (!(period > 90) || !(period < 120) || !college || !skills.length) {
      alert("Please fill in all required fields.");
      return;
    }
    handleSubmitData({ period, skills, college });
  };
  return (
    <Box className="w-full p-5 flex-start pt-1 pb-2 flex flex-col gap-y-7">
      <FormControl className="w-full flex flex-col gap-y-7">
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold mb-3">
            DISIRED INTERNSHIP PERIOD
          </div>
          <div className="flex flex-row border-2 h-[50px] w-full hover:border-2 rounded-md">
            <input
              className="outline-0 w-full pl-[30px] h-full"
              type="number"
              value={period}
              onChange={handleChangePeriod}
            ></input>
            <div className="w-5/12 border-l-2 border-l-gray-1 items-center flex justify-center bg-slate-100">
              DAYS
            </div>
          </div>
          <div className="text-xs mt-2 text-red-500/100">
            {/* {(period < 90 || period > 120) &&
              "Please enter a number between 90 and 120 days"} */}
          </div>
        </div>
      </FormControl>
      <FormControl className="w-full flex flex-col gap-y-7">
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold mb-2">SKILLS</div>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            className="w-full"
            multiple
            value={skills}
            onChange={handleSkillChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, skills, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
      <FormControl className="w-full flex flex-col gap-y-7">
        <div className="flex flex-col items-start w-full">
          <div className="text-sm font-semibold mb-2">COLLEGE</div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-full text-start mb-10"
            value={college}
            onChange={handleCollegeChange}
          >
            <MenuItem value={"item1"}>Item1</MenuItem>
            <MenuItem value={"item2"}>Item2</MenuItem>
            <MenuItem value={"item3"}>Item3</MenuItem>
          </Select>

          <Button
            variant="contained"
            className="w-[110px] h-[50px] !rounded-none !rounded-tl-lg !rounded-br-lg !ml-auto"
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </FormControl>
    </Box>
  );
};
