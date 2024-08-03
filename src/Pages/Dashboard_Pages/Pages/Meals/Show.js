import "../DataTable.css";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs } from "antd";
import {
  FaInfoCircle,
  FaImage,
  FaThLarge,
  FaPlus,
  FaPuzzlePiece,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Information from "./Models/Information";
import Image from "./Models/Image";
import Variations from "./Models/Variations";
import Extra from "./Models/Extra";
import Addon from "./Models/Addon";
import { getData } from "../../../../axiosConfig/API";

export default function ShowItem() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [addons, setAddons] = useState(null);
  const [extras, setExtras] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeal = useCallback(async (id) => {
    try {
      const result = await getData(`meals/${id}`);
      setMeal(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn(error.response.data.error);
    }
  }, []);

  const fetchAddons = useCallback(async (id) => {
    try {
      const result = await getData(`admin/meals/${id}/addons`);
      setAddons(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  const fetchExtras = useCallback(async (id) => {
    try {
      const result = await getData(`admin/meals/${id}/extras`);
      setExtras(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchMeal(id);
    if (meal) {
      fetchAddons(meal.id);
      fetchExtras(meal.id);
    }
  }, [meal]);

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
          {meal && <Information data={meal} />}
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
          <Image />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaThLarge />
              Variations
            </span>
          }
          key="3"
        >
          <Variations />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPlus />
              Extra
            </span>
          }
          key="4"
        >
          <Extra meal_id={id} data={extras} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPuzzlePiece />
              Addon
            </span>
          }
          key="5"
        >
          <Addon meal_id={id} data={addons} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
