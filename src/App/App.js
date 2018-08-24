import React, { Component } from 'react';
import axios from 'axios';
import FlipMove from 'react-flip-move';

import UpImage from './images/up.png';
import DownImage from './images/down.png';
import './App.css';
import './Item.css';
import './Table.css';

class App extends Component {
  state = {
    data: '',
    order: '',
    search: ''
  };

  async componentWillMount() {
    const allData = await axios.get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    );
    const data = allData.data;

    await this.setState({ data });
  }

  handleClick = e => {
    this.setState({ order: e.target.name });
  };

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  table = (data, order) => {
    const results = data
      .sort((a, b) => {
        switch (order) {
          case 'ID_up':
            return a.id > b.id;
          case 'ID_down':
            return a.id < b.id;
          case 'Type_up':
            return a.type.toUpperCase() > b.type.toUpperCase();
          case 'Type_down':
            return a.type.toUpperCase() < b.type.toUpperCase();
          case 'Setup_up':
            return a.setup.toUpperCase() > b.setup.toUpperCase();
          case 'Setup_down':
            return a.setup.toUpperCase() < b.setup.toUpperCase();
          case 'Punchline_up':
            return a.punchline.toUpperCase() > b.punchline.toUpperCase();
          case 'Punchline_down':
            return a.punchline.toUpperCase() < b.punchline.toUpperCase();
          default:
            return a;
        }
      })
      .filter(d => {
        const { search } = this.state;
        const { type, setup, punchline } = d;

        const textMatch =
          type.toLowerCase().includes(search.toLowerCase()) ||
          setup.toLowerCase().includes(search.toLowerCase()) ||
          punchline.toLowerCase().includes(search.toLowerCase());
        return textMatch;
      })
      .map(d => (
        <div
          className="table__body"
          key={d.id * Math.floor(Math.random() * Date.now() * Math.random())}
        >
          <div className="table__item">
            <span className="table__title">ID</span>
            <span>{d.id}</span>
          </div>
          <div className="table__item">
            <span className="table__title">Type</span>
            <span>{d.type}</span>
          </div>
          <div className="table__item">
            <span className="table__title">Setup</span>
            <span>{d.setup}</span>
          </div>
          <div className="table__item">
            <span className="table__title">Punchline</span>
            <span>{d.punchline}</span>
          </div>
        </div>
      ));
    return results;
  };

  render() {
    const { data } = this.state;
    let results = undefined;
    if (data) {
      results = this.table(data, this.state.order);
    }
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Jokes API</h1>
        </header>
        <main className="main">
          <input
            className="search__input"
            type="text"
            placeholder="Type to search"
            value={this.state.search}
            onChange={this.handleSearch}
          />
          <div className="table">
            {data && (
              <React.Fragment>
                <div className="table__header">
                  <div className="item__header">
                    ID
                    <div className="image__group">
                      <img
                        onClick={this.handleClick}
                        name="ID_up"
                        src={UpImage}
                        alt="up"
                      />
                      <img
                        onClick={this.handleClick}
                        name="ID_down"
                        src={DownImage}
                        alt="down"
                      />
                    </div>
                  </div>
                  <div className="item__header">
                    Type
                    <div className="image__group">
                      <img
                        onClick={this.handleClick}
                        name="Type_up"
                        src={UpImage}
                        alt="up"
                      />
                      <img
                        onClick={this.handleClick}
                        name="Type_down"
                        src={DownImage}
                        alt="down"
                      />
                    </div>
                  </div>
                  <div className="item__header">
                    Setup
                    <div className="image__group">
                      <img
                        onClick={this.handleClick}
                        name="Setup_up"
                        src={UpImage}
                        alt="up"
                      />
                      <img
                        onClick={this.handleClick}
                        name="Setup_down"
                        src={DownImage}
                        alt="down"
                      />
                    </div>
                  </div>
                  <div className="item__header">
                    Punchline
                    <div className="image__group">
                      <img
                        onClick={this.handleClick}
                        name="Punchline_up"
                        src={UpImage}
                        alt="up"
                      />
                      <img
                        onClick={this.handleClick}
                        name="Punchline_down"
                        src={DownImage}
                        alt="down"
                      />
                    </div>
                  </div>
                </div>
                <FlipMove
                  maintainContainerHeight={true}
                  staggerDurationBy="30"
                  duration={100}
                >
                  {results}
                </FlipMove>

                <span className="results-message">
                  Showing {results.length} results
                </span>
              </React.Fragment>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
