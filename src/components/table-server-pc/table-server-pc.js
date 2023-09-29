import {useEffect, useState} from "react";
import { Table } from "antd";
import { columns } from "../../const";
import { dataTable } from "../../mocks/table-mock";
import SearchServerPc from "../search-server-pc/search-server-pc";

const DEFAULT_PAGE_SIZE = 10;

function TableServerPc({searchValue}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState({filterByType: '', filterByTags: []});

  const dataTableFiltered = dataTable.filter((item) => {
    if (selectedFilter.filterByType && item.type !== selectedFilter.filterByType) {
      return false;
    }

    if (Array.isArray(selectedFilter.filterByTags) && selectedFilter.filterByTags.length > 0) {
      const hasMatchingTag = selectedFilter.filterByTags.some((tag) => item.tags.includes(tag));

      if (!hasMatchingTag) {
        return false;
      }
    }

    if (searchValue && !item.name.includes(searchValue)) {
      return false;
    }

    return true;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = dataTableFiltered ? Math.min((rangeStart + pageSize - 1), dataTableFiltered.length) : 0;

  return (
    <div>
      <div style={{marginBottom: 16, display: "flex", justifyContent: "space-between"}}>
        <span style={{marginLeft: 8, alignSelf: "center"}}>
          {`Записи ${rangeStart}-${rangeEnd} из ${dataTableFiltered.length}`}
        </span>
        <SearchServerPc
          onFilterChange={(filterByType, filterByTags) => setSelectedFilter({filterByType, filterByTags})}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTableFiltered}
        pagination={{
          total: dataTableFiltered.length,
          showSizeChanger: true,
          current: currentPage,
          pageSize: pageSize,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
          position: ['bottomLeft'],
        }}
        style={{overflow: "scroll"}}
      />
    </div>
  );
}

export default TableServerPc;
