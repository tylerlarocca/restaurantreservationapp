import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import TableForm from '../../Forms/TableForm';

const NewTableCtr = () => {
  const { table_id } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    table_id ? setTitle(`Edit`) : setTitle('New');
  }, [table_id]);

  return (
    <div>
      <div className="d-md-flex text-center">
        <h1>{title} Table</h1>
      </div>
      <TableForm />
    </div>
  );
};

export default NewTableCtr;