import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SubHeader = ({ current, detail }) => {
    return (
      <Row>
        <Col>
          <Breadcrumb>            
            {detail && (
              <BreadcrumbItem>
                <Link to='/'>Popular Movies</Link>
              </BreadcrumbItem>
            )}
            <BreadcrumbItem active>{current}</BreadcrumbItem>
          </Breadcrumb>
          <h2>{current}</h2>
          <hr />
        </Col>
      </Row>
    );
};

export default SubHeader;
