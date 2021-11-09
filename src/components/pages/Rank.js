import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  FormGroup,
  FormControlLabel,
  Menu,
  MenuItem,
  Paper,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Switch
} from "@mui/material";

const columns = [
  {
    id: "no",
    label: "Rank No.",
    minWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "score",
    label: "Score",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  }
];

const DefaultRows = [
  { no: 1, name: "Player 1", score: 100 },
  { no: 2, name: "Player 2", score: 99 },
  { no: 3, name: "Player 3", score: 98 },
  { no: 4, name: "Player 4", score: 95 },
  { no: 5, name: "Player 5", score: 93 },
  { no: 6, name: "Player 6", score: 92 },
  { no: 7, name: "Player 7", score: 91 },
  { no: 8, name: "Player 8", score: 90 },
  { no: 9, name: "Player 9", score: 88 },
  { no: 10, name: "Player 10", score: 85 },
  { no: 11, name: "Player 11", score: 83 },
  { no: 12, name: "Player 12", score: 82 },
  { no: 13, name: "Player 13", score: 80 },
  { no: 14, name: "Player 14", score: 79 },
  { no: 15, name: "Player 15", score: 77 },
  { no: 16, name: "Player 6", score: 72 },
  { no: 17, name: "Player 7", score: 71 },
  { no: 18, name: "Player 8", score: 70 },
  { no: 19, name: "Player 9", score: 68 },
  { no: 20, name: "Player 10", score: 65 }
];

const username = "Player 8";

export default function Ranking() {
  const [rows, setRows] = React.useState(DefaultRows);
  const [searched, setSearched] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(false);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const your_rank = DefaultRows.find((row) => {
    return row.name === username;
  });

  const onSearch = (event) => {
    let str = event === undefined ? "" : event.target.value;
    setSearched(str);
    const filteredRows = DefaultRows.filter((row) => {
      return row.name.toLowerCase().includes(str.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#2E3B55" }}>
          <Toolbar>
            <Typography color="white" variant="h6" sx={{ flexGrow: 1 }}>
              Obstacle Crossed
            </Typography>
            {auth ? (
              <>
                <IconButton
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar>A</Avatar>
                  <Typography m color="white">
                    {username}
                  </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit">Login</Button>
                <Button color="inherit">Signup</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="mode"
              />
            }
            label={auth ? "Login" : "Logout"}
          />
        </FormGroup>
      </Box>
      <Typography my={2} variant="h5" style={{ textAlign: "center" }}>
        LEADERBOARD
      </Typography>
      <Toolbar>
        <TextField onChange={onSearch} value={searched} />
      </Toolbar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ fontWeight: "bold", minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            {auth && (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ top: 57, backgroundColor: "skyblue" }}
                >
                  YOU #{your_rank.no}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ top: 57, backgroundColor: "skyblue" }}
                >
                  {your_rank.name}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ top: 57, backgroundColor: "skyblue" }}
                >
                  {your_rank.score}
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
