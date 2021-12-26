import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import sha1 from "js-sha1";

class Blockchain extends Component {
  componentWillMount() {
    this.setState({
      blockchainHash: sha1(JSON.stringify(this.state.cards))
    });
  }

  state = {
    cards: [{ data: "This is the first blockchain's block." }],
    newData: "",
    blockchainHash: ""
  };

  render() {
    return (
      <div>
        {this.getCards(this.state.cards)}
        <p>My hash: {sha1(JSON.stringify(this.state.cards))}</p>
        <p>Network hash: {this.state.blockchainHash}</p>
        <div>
          <div style={{ display: "flex" }}>
            <TextField
              disabled={
                this.state.blockchainHash !==
                sha1(JSON.stringify(this.state.cards))
              }
              style={{ flex: 1, margin: 5 }}
              id="New Data"
              label="New Data"
              value={this.state.newData}
              onChange={this.handleChange("newData")}
              margin="normal"
            />
          </div>
          <Button
            disabled={
              this.state.blockchainHash !==
              sha1(JSON.stringify(this.state.cards))
            }
            variant="contained"
            color="primary"
            onClick={this.addBlock()}
          >
            Add Block
          </Button>
        </div>
      </div>
    );
  }

  getStatusStyle(blockchainHash, cards) {
    let cardsHash = sha1(JSON.stringify(cards));

    if (cardsHash === blockchainHash) {
      return {
        background: "#ddeedd"
      };
    }

    return {
      background: "#e4d1d1"
    };
  }

  getCards(cards) {
    let content;

    cards.forEach((card, index) => {
      content = (
        <Card
          style={this.getStatusStyle(
            this.state.blockchainHash,
            this.state.cards
          )}
        >
          <CardContent>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <h4>{"Bloque Nº " + (index + 1)}</h4>
              </div>
              <div style={{ flex: 5 }}>
                <TextField
                  style={{ flex: 1, width: "100%" }}
                  id="Block data"
                  label="Block data"
                  value={card.data}
                  onChange={this.handleBlockModify(index)}
                  margin="normal"
                />
              </div>
            </div>
            <p>{content}</p>
          </CardContent>
        </Card>
      );
    });

    return content;
  }

  handleChange = name => ev => {
    this.setState({
      [name]: ev.target.value
    });
  };

  handleBlockModify = index => ev => {
    let cards = [...this.state.cards];

    cards[index].data = ev.target.value;

    this.setState({
      cards: cards,
      newData: ""
    });
  };

  addBlock = () => ev => {
    let cards = [
      ...this.state.cards,
      {
        data: this.state.newData
      }
    ];

    this.setState({
      cards: cards,
      newData: "",
      blockchainHash: sha1(JSON.stringify(cards))
    });
  };
}

export default Blockchain;
