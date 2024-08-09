import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import Information from "./Information";
import UpdateImage from "../Actions/UploadImage";
import { FaImage } from "react-icons/fa6";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [addon, setAddon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddon = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`addons/${id}`);
      setAddon(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchAddon(id);
  }, [id, fetchAddon]);

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
          <Information data={addon} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FaImage />
              Update Image
            </span>
          }
          key="2"
        >
          <UpdateImage url={`admin/addons/${id}`} data={addon} />
        </TabPane>
      </Tabs>
    </div>
  );
}
