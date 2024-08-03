import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import Information from "./Models/Information";
import Image from "./Models/Image";
import { FaImage } from "react-icons/fa6";

import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();

  const [extra, setExtra] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExtra = useCallback(async (id) => {
    try {
      const result = await getData(`extras/${id}`);
      setExtra(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchExtra(id);
  }, [fetchExtra]);

  if (loading) return <p>loading...</p>;

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          <Information data={extra} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FaImage />
              Images
            </span>
          }
          key="2"
        >
          <Image data={extra} />
        </TabPane>
      </Tabs>
    </div>
  );
}