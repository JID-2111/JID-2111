import { UnitTestType } from 'db/models/UnitTestModels';
import { Container, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import '../../../scss/Condition.scss';

interface IConditionProps {
  condition: Partial<UnitTestType>;
  deleteCondition: (c: Partial<UnitTestType>) => void;
}

const UnitTest = ({ condition, deleteCondition }: IConditionProps) => {
  // eslint-disable-next-line no-restricted-globals
  const {
    level,
    name,
    column,
    operation,
    value,
    total,
    expectedRecordMatches,
    expectedNumRecords,
    table,
  } = condition;

  const getDescription = () => {
    return (
      <span>
        {operation === 'exists' ? `table "${table}" ` : ''}
        {column && `column "${column}" `}
        {operation && `${operation.toUpperCase()} `}
        {value && `"${value}", `}
        {total && `${total} `}
        {expectedRecordMatches && `${expectedRecordMatches} `}
        {expectedNumRecords && `${expectedNumRecords} `}
        {operation !== 'exists' ? `in ${table}` : ''}
      </span>
    );
  };
  return (
    <Container fluid className="rule-container">
      <Row>
        <div className="d-flex">
          <span>name: {name}</span>
          <button
            type="button"
            className="deleteButton edit-icons"
            onClick={() => deleteCondition(condition)}
          >
            <Trash />
          </button>
        </div>
      </Row>
      <Row>
        <span>test type: {level}</span>
      </Row>
      <Row>
        <span>description: {getDescription()}</span>
      </Row>
    </Container>
  );
};

export default UnitTest;