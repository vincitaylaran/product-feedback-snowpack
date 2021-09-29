import React from 'react';
import Card from '../Card';
import { ProductRequestStatus } from '../../interfaces/productRequest.interface';
import style from './Roadmap.module.scss';

type RoadMapItem = [ProductRequestStatus, string, number];
const roadmapItems: RoadMapItem[] = [
  [ProductRequestStatus.InProgress, 'orange', 1],
  [ProductRequestStatus.Live, 'purple', 3],
  [ProductRequestStatus.Planned, 'green', 5],
  [ProductRequestStatus.Suggestion, 'blue', 2],
];

interface RoadmapProps {}
function Roadmap({}: RoadmapProps) {
  return (
    <Card className={style.roadmap}>
      <div className={style.header}>
        <h2>Roadmap</h2>
        <a>View</a>
      </div>
      {roadmapItems.map(([label, color, value]) => (
        <div key={label} className={style.item}>
          <Circle height="8px" color={color} className={style.dot} />
          <span>{formatKeyString(label)}</span>
          <span className={style.value}>{value}</span>
        </div>
      ))}
    </Card>
  );
}

function formatKeyString(keyString: string) {
  return keyString[0].toUpperCase() + keyString.substring(1);
}

interface CircleProps {
  height: string;
  color: string;
  className: string;
}
const Circle = ({ height, color, className }: CircleProps) => (
  <svg className={className} height={height} viewBox="0 0 10 10">
    <circle r="5" cx="5" cy="5" fill={color} />
  </svg>
);

export default Roadmap;
