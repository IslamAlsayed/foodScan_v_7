import { Row, Col } from "antd";

export default function Information({ data }) {
  if (!data) return <p>Loading2...</p>;

  return (
    <div className="Information">
      <Row gutter={16}>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>name</label>
            <span>{data.name}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>discount</label>
            <span>{data.discount}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>startDate</label>
            <span>{data.startDate}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex pt-2 pb-2">
            <label>endDate</label>
            <span>{data.endDate}</span>
          </div>
        </Col>
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
      </Row>
      {/* 
      <div className="content">
        <div className="row">
          <div className="col col-12 col-md-6">
            <b>name</b>
            <span>{data.name}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>discount</b>
            <span>{data.discount}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>start date</b>
            <span>{data.startDate}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>end date</b>
            <span>{data.endDate}</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>status</b>
            <span>
              <span className={data.status}>{data.status}</span>
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
