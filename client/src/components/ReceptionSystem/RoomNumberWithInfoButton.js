import { IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
export function RoomNumberWithInfoButton({ title, action }) {
  return (
    <div>
      {title}
      <IconButton  onClick={action} color="primary" aria-label="room info">
        <InfoOutlinedIcon />
      </IconButton>
    </div>
  );
}
