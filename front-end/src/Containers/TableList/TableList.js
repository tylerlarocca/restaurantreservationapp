import React from 'react';
import Table from '../../Components/Table/Table';

const TableList = ({ tables }) => {
  return tables.length === 0 ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <ul className="d-flex flex-wrap justify-content-md-between justify-content-around p-0">
      {tables.map((table) => (
        <Table table={table} key={`${table.table_id}${table.table_name}`} />
      ))}
    </ul>
  );
};

export default TableList;