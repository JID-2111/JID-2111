import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ConnectionModel } from '../../db/Models';
import DBProvider from '../../db/entity/enum';

interface IProcedureDropdownProps {
  setCode: (code: string) => void;
}

const ProcedureDropdown = ({ setCode }: IProcedureDropdownProps) => {
  const defaultVal = 'View Stored Procedures';
  const proceduresDefault = ['test1', 'test2', 'alexiscool'];

  const [value, setValue] = useState<string>(defaultVal);
  const [fetch, setFetch] = useState<boolean>(false);
  const [procedures, setProcedures] = useState<string[]>();

  useEffect(() => {
    const fetchProcs = async () => {
      const model = new ConnectionModel({
        type: DBProvider.PostgreSQL,
        nickname: 'something_dumb',
        connectionConfig: {
          config: 'string',
          connectionString: 'postgresql://kpmg:asdf@localhost:5432/React',
        },
      });
      await window.connections.ipcRenderer.create(model);
      const newProcs = await window.procedures.ipcRenderer.fetchProcedures();
      setProcedures(newProcs.get('React'));
    };
    fetchProcs();
  }, [fetch]);

  const handleClick = async (procedure: string) => {
    setValue(procedure);
    const test = await window.procedures.ipcRenderer.fetchContent(procedure);
    setCode(test);
  };

  return (
    <Dropdown className="dropdown">
      <Dropdown.Toggle variant="primary">{value}</Dropdown.Toggle>

      <Dropdown.Menu onClick={() => setFetch(true)}>
        {(procedures || proceduresDefault).map((procedure: string) => {
          return (
            <Dropdown.Item onClick={() => handleClick(procedure)}>
              {procedure}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProcedureDropdown;
