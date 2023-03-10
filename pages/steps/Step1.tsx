import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

export default ({ handleNext }: any) => {
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [headLine, setHeadLine] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleChangeFirstName = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleChangeHeadLine = (event: ChangeEvent<HTMLInputElement>) => {
    setHeadLine(event.target.value);
  };
  const handleChangeBio = (event: ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleImageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setImageURL(URL.createObjectURL(evt.target.files[0]));
    }
  };
  const handleClickBadge = (evt: React.MouseEvent<HTMLSpanElement>): void => {
    evt.stopPropagation();
    const target = evt.currentTarget as HTMLElement;
    if (target.tagName === "SPAN") console.log("true");
  };

  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !location ||
      !headLine ||
      !bio ||
      !imageURL
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    handleNext({
      firstName,
      lastName,
      location,
      headLine,
      bio,
      imageURL,
    });
  };
  return (
    <Box className="w-full p-5 mt-10 gap-y-10 flex flex-col">
      <div className="flex flex-row">
        <Badge
          badgeContent={imageURL ? "X" : 0}
          color="secondary"
          onClick={handleClickBadge}
          showZero={false}
        >
          <Image
            src={imageURL ? imageURL : "/images.png"}
            alt="your image"
            className="rounded-md"
            width={70}
            height={70}
          ></Image>
        </Badge>

        <input
          style={{ display: "none" }}
          id="contained-button-file"
          onChange={handleImageChange}
          type="file"
        />
        <label htmlFor="contained-button-file" className="ml-20 mt-auto">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className="ml-20"
          >
            {imageURL ? "Change Photo" : "Upload Photo"}
          </Button>
        </label>
      </div>
      <div className="w-full flex gap-5 justify-between">
        <TextField
          required
          id="outlined-required"
          className="w-full"
          label="FIRST NAME"
          value={firstName}
          onChange={handleChangeFirstName}
          placeholder="Input FirstName"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          className="w-full"
          label="LAST NAME"
          defaultValue="Smith"
          value={lastName}
          onChange={handleChangeLastName}
          placeholder="Input LastName"
        />
      </div>
      <FormControl fullWidth className="gap-y-10 flex flex-column">
        <InputLabel id="demo-simple-select-label">LOCATION</InputLabel>
        <Select
          id="demo-simple-select"
          value={location}
          label="LOCATION"
          onChange={handleChangeLocation}
          className="text-left"
        >
          <MenuItem value={"LosAngeles"}>Los Angeles, CA</MenuItem>
          <MenuItem value={"Neptune"}>Neptune, NJ</MenuItem>
          <MenuItem value={"SanFrancisco"}>San Francisco, CA</MenuItem>
        </Select>
        <TextField
          required
          id="outlined-required"
          className="w-full mt-10"
          label="HEADLINE"
          value={headLine}
          onChange={handleChangeHeadLine}
          placeholder="Input HeadLine"
        />
        <TextField
          required
          id="outlined-required"
          multiline
          rows={5}
          label="BIO"
          className="w-full mt-10"
          value={bio}
          onChange={handleChangeBio}
          placeholder="Input Bio"
        />

        <Button
          variant="contained"
          className="w-[110px] h-[50px] !rounded-none !rounded-tl-lg !rounded-br-lg !ml-auto"
          onClick={handleSubmit}
        >
          Next
        </Button>
      </FormControl>
    </Box>
  );
};
