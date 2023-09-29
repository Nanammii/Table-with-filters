import {
  BookOutlined,
  DatabaseOutlined,
  FileOutlined,
  GlobalOutlined,
  HomeOutlined,
  MonitorOutlined, SettingOutlined, SyncOutlined
} from "@ant-design/icons";
import {Tag} from "antd";

export const iconsList = [
  {
    icon: HomeOutlined,
    label: 'Дашборд',
    subItems: []
  },
  {
    icon: DatabaseOutlined,
    label: 'CMDB',
    subItems: ['Серверы и ПК', 'Гипервизоры и вирт. машины', 'Принтеры и МФУ', 'Сетевые устройства']
  },
  {
    icon: GlobalOutlined,
    label: 'Сеть',
    subItems: []
  },
  {
    icon: BookOutlined,
    label: 'Справочники',
    subItems: []
  },
  {
    icon: FileOutlined,
    label: 'Отчеты',
    subItems: []
  },
  {
    icon: MonitorOutlined,
    label: 'Мониторинг',
    subItems: []
  },
  {
    icon: SyncOutlined,
    label: 'Автоматизация',
    subItems: []
  },
  {
    icon: SettingOutlined,
    label: 'Администрирование',
    subItems: []
  },
];

export const columns = [
  {
    title: 'Наименование',
    dataIndex: 'name',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
  },
  {
    title: 'Расположение',
    dataIndex: 'location',
  },
  {
    title: 'Орг. единица',
    dataIndex: 'unit',
  },
  {
    title: 'Инв. номер',
    dataIndex: 'inventoryNumber',
  },
  {
    title: 'Теги',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          const color = 'green';
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Дата создания',
    dataIndex: 'dateCreation',
  },
  {
    title: 'Дата обновления',
    dataIndex: 'dateUpdate',
  },
  {
    title: 'Дата аудита',
    dataIndex: 'dateAudit',
  },
];
