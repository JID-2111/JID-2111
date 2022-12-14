import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ProcedureParameter } from 'db/Procedures';

import '../../scss/Execute.scss';
import Modal from '../utils/Modal';

interface IProcedureDropdownProps {
  activeDb: string;
  activeProcedure: string;
  setActiveProcedure: (procedure: string) => void;
  setActiveParameters: (parameter: ProcedureParameter[]) => void;
  setCode: (code: string) => void;
}

const ProcedureDropdown = ({
  activeDb,
  activeProcedure,
  setActiveProcedure,
  setActiveParameters,
  setCode,
}: IProcedureDropdownProps) => {
  const proceduresDefault = ['test1', 'test2', 'test3'];

  const [procedures, setProcedures] = useState<string[]>();
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    const fetchProcs = async () => {
      const newProcs = await window.procedures.ipcRenderer.fetchProcedures([
        activeDb,
      ]);
      setProcedures(newProcs.get(activeDb));
    };
    fetchProcs();
  }, [activeDb]);

  const handleClick = async (procedure: string) => {
    setActiveProcedure(procedure);

    try {
      const code = await window.procedures.ipcRenderer.fetchContent(procedure);
      setCode(code);
    } catch (e) {
      setAlert(true);
    }
    const params = await window.procedures.ipcRenderer.getProcedureParameters(
      procedure
    );

    setActiveParameters(params);
  };

  const showAlert = () => {
    return (
      <>
        <Modal
          show={alert}
          handleClose={() => setAlert(false)}
          title="Error"
          modalBody="Could not load the procedure."
        />
      </>
    );
  };

  return (
    <>
      <Dropdown className="dropdown">
        <Dropdown.Toggle variant="primary">{activeProcedure}</Dropdown.Toggle>

        <Dropdown.Menu>
          {(procedures || proceduresDefault).map((procedure: string) => {
            const procKey = `procedure-${procedure}`;
            return (
              <Dropdown.Item
                key={procKey}
                onClick={() => handleClick(procedure)}
              >
                {procedure}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      {alert && showAlert()}
    </>
  );
};

export default ProcedureDropdown;
