import React from 'react';
import { getArray } from 'src/utils';
import cn from 'classnames';
import classes from './styles.scss';

export default function ScoreSheet({ data }) {
  const header = getArray(10);
  const cols = getArray(20);
  return (
    <div className="table-responsive">
      <table className={cn('table table-bordered table-sm', classes.table)}>
        <thead>
          <tr>
            <th scope="col">Frame</th>
            {header.map((_, idx) => (
              <th scope="col" colSpan={2} key={idx}>
                {idx + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Score</th>
            {cols.map((_, idx) => <td key={idx}>{data[idx]}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
