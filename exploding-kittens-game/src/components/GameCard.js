import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  Button,
  CardContent,
  Grid,
  Typography,
  Table,
  Stack,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { flipCard } from "../redux/action";
import { logout } from "../redux/reducers";

const GameCard = () => {
  const cardState = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const ClickHandler = () => {
    dispatch(flipCard());
  };
  console.log(cardState);

  return (
    <>
      <Typography variant="h4" component="h4" sx={{ margin: "1rem 0 2rem 0" }}>
        {cardState.playerUsername}!
      </Typography>

      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          sx={{ width: "60rem", margin: "auto", paddingRight: "20px" }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8} sx={{ textAlign: "justify" }}>
                <Typography>{cardState.cardName}</Typography>
                <Typography>{cardState.res}</Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "end" }}>
                <Typography>Card Left:{cardState.deck.length}</Typography>
                <Typography>Defuse:{cardState.defuseCards}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          direction="row"
          spacing={2}
          sx={{ margin: "2rem 0", justifyContent: "center" }}
        >
          <Button variant="contained" size="large" onClick={ClickHandler}>
            Flip Card
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              localStorage.removeItem("cards");
              dispatch(logout());
            }}
          >
            LogOut
          </Button>
        </Stack>
      </Box>

      {cardState.leaderboard.length !== 0 && (
        <TableContainer
          component={Paper}
          sx={{ width: "60rem", margin: "auto", paddingRight: "20px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Players Name</TableCell>
                <TableCell align="right">Game Won</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardState.leaderboard.map((player) => (
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {player.username}
                  </TableCell>
                  <TableCell align="right">{player.gamesWon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default GameCard;
