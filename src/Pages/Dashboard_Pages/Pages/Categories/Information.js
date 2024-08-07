import { Row, Col } from "antd";

export default function Information({ data }) {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="Information">
      <Row gutter={16}>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Name</label>
            <span>{data.name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Status</label>
            <span className={data.status === 1 ? "active" : "inactive"}>
              {data.status === 1 ? "active" : "inactive"}
            </span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>Description</label>
            <span>{data.description}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
