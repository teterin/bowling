import React from 'react';

export default function PlayerList({ data = [], onRemove = Function.prototype }) {
  return (
    <ul className="list-group">
      {data.map((name) => {
        const handleClick = () => onRemove(name);
        return (
          <li key={name} className="list-group-item">
            {name}
            <button type="button" className="close" aria-label="Close" onClick={handleClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
