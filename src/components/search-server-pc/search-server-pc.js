import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Popover, Select, Space } from "antd";
import Search from "antd/lib/input/Search";
import { optionSelectTags, optionSelectTypes } from "../../mocks/table-mock";

function SearchServerPc({onFilterChange}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchTagsValue, setSearchTagsValue] = useState([]);
  const [searchTypeValue, setSearchTypeValue] = useState('');
  const paramsFromUrl = new URLSearchParams(location.search);
  const searchValueFromURL = paramsFromUrl.get('search_val');
  const endpointTypeFromURL = paramsFromUrl.get('endpoint_type');
  const endpointTagsFromURL = paramsFromUrl.get('endpoint_tags')?.split(',');

  useEffect(() => {
    setSearchValue(searchValueFromURL || '');
    setSearchTypeValue(endpointTypeFromURL || '');
    setSearchTagsValue(endpointTagsFromURL || []);
    onFilterChange(endpointTypeFromURL, endpointTagsFromURL);
  }, []);

  const handlePopoverClose = () => {
    setSearchTypeValue(searchTypeValue);
    setSearchTagsValue(searchTagsValue);
    paramsFromUrl.set('endpoint_type', searchTypeValue);
    paramsFromUrl.set('endpoint_tags', searchTagsValue);
    onFilterChange(searchTypeValue, searchTagsValue);
    navigate(`?${paramsFromUrl.toString()}`)
    setIsPopoverOpen(false);
  };

  const handleSelectTags = (value) => {
    setSearchTagsValue(value);
  }

  const handleSearch = (value) => {
    setSearchValue(value);
    paramsFromUrl.set('search_val', searchValue);
    navigate(`?${paramsFromUrl.toString()}`)
  };

  const handleSelectChange = (value) => {
    setSearchTypeValue(value);
  }

  const handleResetButton = () => {
    setSearchTypeValue('');
    setSearchTagsValue([]);
  }

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const content = (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <p style={{margin: '20px 0 10px'}}>Тип ПК</p>
        <Select
          style={{width: '100%'}}
          showSearch
          value={searchTypeValue}
          placeholder="Выбрать"
          optionFilterProp="children"
          onChange={handleSelectChange}
          filterOption={filterOption}
          options={optionSelectTypes}
        />
        <p style={{margin: '20px 0 10px'}}>Теги</p>
        <Select
          style={{width: '100%'}}
          mode="multiple"
          value={searchTagsValue}
          placeholder="Выбрать"
          filterOption={filterOption}
          options={optionSelectTags}
          onChange={handleSelectTags}
        />
      </div>
      <Space wrap>
        <Button type="primary" onClick={handlePopoverClose}>Применить</Button>
        <Button onClick={handleResetButton}>Сбросить</Button>
      </Space>
    </div>
  );

  return (
    <Search
      placeholder="Поиск"
      value={searchValue}
      prefix={<SearchOutlined />}
      onChange={(e) => handleSearch(e.target.value)}
      onSearch={handleSearch}
      style={{width: '40%'}}
      addonAfter={
        <Popover
          content={content}
          title="Фильтры"
          placement="bottom"
          visible={isPopoverOpen}
          onVisibleChange={setIsPopoverOpen}
          trigger="click"
        >
          <Button>{<FilterFilled />}</Button>
        </Popover>
      }
    />
  );
}

export default SearchServerPc;
