import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import { Button, Space } from "antd";
import { FilterOutlined, FileExcelOutlined } from "@ant-design/icons";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function ItemsReports() {
  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    const myCollapse = document.getElementById("collapseTarget");

    if (myCollapse) {
      const bsCollapse = new Collapse(myCollapse, { toggle: false });
      toggleFilter ? bsCollapse.show() : bsCollapse.hide();
    }
  }, [toggleFilter]);

  const handleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleExport = () => {
    var listPrint = document.getElementById("listPrint");
    listPrint.classList.toggle("show");
  };

  const pathname = window.location.pathname.replace("/admin/dashboard/", "");

  return (
    <div className="headerTable">
      <div className="head">
        <div className="titlePage">{pathname}</div>

        <Space className="actions">
          <Button icon={<FilterOutlined />} onClick={handleFilter}>
            Filter
            <IoMdArrowDropdown />
          </Button>
          <div className="dropListPrint">
            <Button
              icon={<FilterOutlined />}
              onClick={handleExport}
              className="btnPrintList"
            >
              Export
              <IoMdArrowDropdown />
            </Button>

            <div className="listPrint" id="listPrint">
              <ul>
                <li>
                  <Button icon={<LuPrinter />}>Print</Button>
                  {/* <ReactToPrint
                  trigger={() => <Button icon={<LuPrinter />}>Print</Button>}
                  content={() => componentRef.current}
                /> */}
                </li>
                <li>
                  <Button icon={<FileExcelOutlined />}>XLS</Button>
                </li>
              </ul>
            </div>
          </div>
        </Space>
      </div>

      <div
        className="ItemsReports FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3">
              <label className="mb-2">category</label>
              <input type="text" className="form-control" name="category" />
            </div>
            <div className="col col-12 col-md-6 col-lg-3">
              <label className="mb-2">type</label>
              <select className="form-control" name="type">
                <option value="" selected disabled>
                  --
                </option>
                <option value="1">veg</option>
                <option value="2">non veg</option>
              </select>
            </div>
            <div className="col col-12 col-md-6 col-lg-3">
              <label className="mb-2">name</label>
              <input type="text" className="form-control" name="name" />
            </div>
            <div className="col col-12 col-md-6 col-lg-3">
              <label className="mb-2">date</label>
              <input type="date" className="form-control" name="date" />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col col-3 d-flex gap-3">
              <button type="search" className="btn btn-primary">
                <FaCheckCircle />
                <span className="ps-2">search</span>
              </button>
              <button type="clear" className="btn btn-secondary">
                <HiXMark />
                <span className="ps-2">clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
