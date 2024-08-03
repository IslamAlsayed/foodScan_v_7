import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import { FaInfoCircle, FaImage } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Information from "./Models/Information";
import Image from "./Models/Image";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategory = useCallback(
    async (id) => {
      try {
        const result = await getData(`categories/${id}`);
        setCategories(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.warn(error.response.data.error);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          <Information data={categories} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaImage />
              Images
            </span>
          }
          key="2"
        >
          <Image data={categories} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
