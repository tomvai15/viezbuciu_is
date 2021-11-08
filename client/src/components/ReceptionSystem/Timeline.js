import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TodayMarker,
  TimelineMarkers,
  CustomMarker,
} from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "moment/locale/lt";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import "./style.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditRoom from "./EditRoom";
import RoomInfo from "./RoomInfo";
import { RoomNumberWithInfoButton } from "./RoomNumberWithInfoButton";
import ReservationInfo from "./ReservationInfo";

export function TimelineWindow() {
  //       .filter(g => g.root || openGroups[g.parent])
  //       .map(group => {
  //         return Object.assign({}, group, {
  //           title: group.root ? (
  //             <div onClick={() => this.toggleGroup(parseInt(group.id))} style={{ cursor: "pointer" }}>
  //               {openGroups[parseInt(group.id)] ? "[-]" : "[+]"} {group.title}
  //             </div>
  //           ) : (
  //             <div style={{ paddingLeft: 20 }}>{group.title}</div>
  //           )
  //         });
  //       });

  const [open, setOpen] = React.useState(false);
  const [openRoom, setOpenRoom] = React.useState(false);
  const [roomId, setRoomId] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRoom = () => {
    setOpenRoom(true);
  };

  const handleCloseRoom = () => {
    setOpenRoom(false);
  };

  const groups = [
    {
      id: 1,
      title: (
        <RoomNumberWithInfoButton title={"101"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 2,
      title: (
        <RoomNumberWithInfoButton title={"102"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 3,
      title: (
        <RoomNumberWithInfoButton title={"103"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 4,
      title: (
        <RoomNumberWithInfoButton title={"201"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 5,
      title: (
        <RoomNumberWithInfoButton title={"202"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 6,
      title: (
        <RoomNumberWithInfoButton title={"203"} action={handleClickOpenRoom} />
      ),
    },
    {
      id: 7,
      title: (
        <RoomNumberWithInfoButton title={"204"} action={handleClickOpenRoom} />
      ),
    },
  ];

  const items = [
    {
      id: 1,
      group: 1,
      start_time: moment().startOf("day").subtract(10, "day").add(12, "hour"),
      end_time: moment().endOf("day").subtract(2, "day").add(11, "hour"),
    },
    {
      id: 2,
      group: 2,
      // title: "Rezervuotas",
      start_time: moment().startOf("day").add(12, "hour"),
      end_time: moment().endOf("day").add(1, "day").add(11, "hour"),
    },
    {
      id: 3,
      group: 1,
      start_time: moment().startOf("day").subtract(1, "day").add(12, "hour"),
      end_time: moment().startOf("day").add(15, "day").add(11, "hour"),
      style: {
        backgroundColor: "red",
      },
    },
    {
      id: 4,
      group: 4,
      start_time: moment().startOf("day").subtract(5, "day").add(12, "hour"),
      end_time: moment().startOf("day").add(10, "day").add(11, "hour"),
      style: {
        backgroundColor: "red",
      },
    },
    {
      id: 5,
      group: 5,
      start_time: moment().startOf("day").add(12, "hour"),
      end_time: moment().startOf("day").add(1, "day").add(11, "hour"),
      style: {
        backgroundColor: "red",
      },
    },
  ];
  const defaultTimeStart = moment().startOf("day").subtract(3, "day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(1, "month").toDate();

  const newGroups = groups;

  const OnRoomClicked = (id) => {
    var item = items.find((element) => {
      return element.id === id;
    });
    setRoomId(item.id);
    handleClickOpen();
  };

  var itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const backgroundColor = itemContext.selected ? "orange" : "#1976D2";
    // const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
          },
          // onMouseDown: () => {
          //   console.log("on item click", item);
          // }
        })}
      ></div>
    );
  };

  return (
    <div > 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="reservation info"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReservationInfo />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Gerai</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRoom}
        onClose={handleCloseRoom}
        aria-labelledby="room info"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <RoomInfo />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoom}>Gerai</Button>
        </DialogActions>
      </Dialog>

      <Timeline className="timeline"
        groups={newGroups}
        items={items}
        onItemSelect={(id) => OnRoomClicked(id)}
        onItemClick={(id) => OnRoomClicked(id)}
        canMove={false}
        canResize={false}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        stackItems
        sidebarWidth={150}
        itemRenderer={itemRenderer}
      >
        <TimelineHeaders
          className="sticky"
          style={{ backgroundColor: "#1976D2" }}
        >
          <TimelineMarkers>
            <CustomMarker date={moment()}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: "red",
                  width: "4px",
                };
                return <div style={customStyles} />;
              }}
            </CustomMarker>
          </TimelineMarkers>

          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div {...getRootProps()}>
                  <Typography
                    style={{
                      color: "white",
                      textAlign: "center",
                      height: "100%",
                      paddingTop: "15px",
                    }}
                  >
                    Kambario nr.
                  </Typography>
                </div>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
}
