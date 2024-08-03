import "./Employees.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import profileImage from "../../../../assets/global/profile.png";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { IoMdNotifications } from "react-icons/io";
import Profile from "./Models/Profile";
import Security from "./Models/Security";
import MyOrders from "./Models/MyOrders";

import { getData } from "../../../../axiosConfig/API";

export default function Show() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(true);
  const [employeeOrders, setEmployeeOrders] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = useCallback(async (id) => {
    try {
      const result = await getData(`admin/employees/${id}`);
      setEmployee(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response.data.error);
    }
  }, []);

  const fetchEmployeeOrders = useCallback(async (id) => {
    try {
      const result = await getData(
        `admin/employees/${id}/orders`,
        handleResponse
      );
      setEmployeeOrders(result);
    } catch (error) {
      console.error(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
      fetchEmployeeOrders(id);
    }
  }, [id, fetchEmployee, fetchEmployeeOrders]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="Show">
      <div className="row">
        <div className="image">
          <img src={profileImage} alt="profile image" />
        </div>

        <div className="details">
          <h3>admin</h3>
          <p className="typeRole">{employee.Role}</p>
        </div>
      </div>

      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane
            className="TabPane"
            tab={
              <span>
                <UserOutlined />
                profile
              </span>
            }
            key="1"
          >
            <Profile data={employee} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockFilled />
                security
              </span>
            }
            key="2"
          >
            <Security data={employee} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IoMdNotifications />
                my orders
              </span>
            }
            key="4"
          >
            <MyOrders data={employeeOrders} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}