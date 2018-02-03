import React from 'react';

export default class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  isValid(name) {
    const { players } = this.props;
    return name !== '' && players.indexOf(name) === -1;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd = Function.prototype } = this.props;
    const name = this.state.name.trim();
    if (this.isValid(name)) {
      this.setState({ name: '' }, () => onAdd(name));
    }
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { name } = this.state;
    const { players } = this.props;
    const disabled = players.length > 4;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Player name"
            maxLength="20"
            value={name}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <span className="input-group-append">
            <button className="btn btn-outline-primary" type="submit" disabled={disabled}>
              Ok
            </button>
          </span>
        </div>
      </form>
    );
  }
}
