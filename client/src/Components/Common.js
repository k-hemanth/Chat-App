import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const ChatWrapper = styled("div")({
  minHeight: "100%",
  display: "flex",
  flexWrap: "wrap",
});

export const UsersWrapper = styled("div")({
  display: "flex",
  flexBasis: "50%",
  flex: "0 0 30%",
  borderRight: "2px solid black",
  minHeight: "calc(100vh - 65px)",
  maxHeight: "calc(100vh - 65px)",
  overflow: "auto",
});

export const ChatBodyWrapper = styled("div")({
  flexBasis: "50%",
  height: "100%",
  flex: "0 0 70%",
});
export const LeftMessage = styled("div")({
  fontSize: "16px",
  clear: "both",
  margin: "8px",
  padding: "13px 14px",
  borderRadius: "5px",
  float: "right",
  backgroundColor: " #eceff1",
});
export const RightMessage = styled("div")({
  fontSize: "16px",
  clear: "both",
  margin: "8px",
  padding: "13px 14px",
  borderRadius: "5px",
  float: "left",
  color: "white",
  backgroundColor: "orange",
});

export const UserHeader = styled("div")({
  width: "100%",
  height: "5%",
});
export const UserHeaderPaper = styled(Paper)({
  height: 60,
  lineHeight: "60px",
  textAlign: "center",
});
export const MessageCardWrapper = styled("div")({
  overflowY: "scroll",
  height: "calc( 100vh - 66px - 60px - 60px )",
});

export const FormWrapper = styled("form")({
  display: "flex",
  justifyContent: "center",
  width: "75%",
  margin: `0 auto`,
});

export const SendButton = styled(Button)({
  backgroundColor: "#f1c5ae",
  color: "black",
});
