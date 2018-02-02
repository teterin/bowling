import React from 'react';
import { getArray } from 'src/utils';
import cn from 'classnames';
import classes from './styles.scss';

export default function ScoreSheet({ data, total }) {
  const header = getArray(10);
  const cols = getArray(21);
  return (
    <div className="table-responsive">
      <table className={cn('table table-bordered table-sm', classes.table)}>
        <thead>
          <tr>
            <th scope="col">Frame</th>
            {header.map((_, idx) => (
              <th scope="col" colSpan={idx === 9 ? 3 : 2} key={idx}>
                {idx + 1}
              </th>
            ))}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Score</th>
            {cols.map((_, idx) => <td key={idx}>{data[idx]}</td>)}
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
