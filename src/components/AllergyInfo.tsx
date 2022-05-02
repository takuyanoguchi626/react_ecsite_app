import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface AllergyInfo {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: AllergyInfo) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AllergyModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="btn"
        style={{ color: "#e0f2f1", backgroundColor: "#004d40" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        アレルギー情報一覧はこちら
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          らくらくPIZZA アレルギー情報
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            ※この情報は食品衛生法でアレルギー物質を含む食品として定められた食品27品目について、商品の原材料を調べたものです。これ以外のアレルギーをお持ちの場合は別途お問い合わせください。
            <br></br>
            ※本来その商品に使用しない食材が製造工場や店舗での調理過程において混入する場合があり、店舗により一部の食材が異なる場合もある
            など絶対的なものではありません。ご購入は担当医とご相談の上、お客様ご自身が最終的にご判断ください。
            <br></br>
            ※ドレッシング、ナゲットソース、ケチャップなどの別添品は、原則として商品に含んで記載しています。
            <br></br>
            ※商品内容の変更に伴い、情報は随時更新されますのでご注意ください。
          </Typography>

          <Typography gutterBottom>
            <img src="../alergyTable.png" alt=""></img>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            閉じる
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
