import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";
import { Button, Space } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function Meals({ handleModalToggle }) {
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

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleModalToggle}
          >
            Add {pathname}
          </Button>
        </Space>
      </div>

      {/* Filtration */}
      <div className="Meals FiltrationModel collapse" id="collapseTarget">
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">category</label>
              <select className="form-control" name="category" id="category">
                <option value="" selected disabled>
                  --
                </option>
                <option value="1">cate 1</option>
                <option value="2">cate 2</option>
                <option value="3">cate 3</option>
                <option value="4">cate 4</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">price</label>
              <input
                type="text"
                className="form-control"
                name="price"
                id="price"
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">size</label>

              <select className="form-control" name="size" id="size">
                <option value="" selected disabled>
                  --
                </option>
                <option value="1">small</option>
                <option value="2">medium</option>
                <option value="3">large</option>
                <option value="4">family</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">number of peace</label>
              <input
                type="text"
                className="form-control"
                name="number_of_peace"
                id="number_of_peace"
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">type</label>
              <select className="form-control">
                <option value="" selected disabled>
                  --
                </option>
                <option value="1">veg</option>
                <option value="0">non veg</option>
              </select>
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
