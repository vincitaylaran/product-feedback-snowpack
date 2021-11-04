import React from 'react';
import { countBy, zipWith } from 'lodash';
import Card from './Card';
import type {
  ProductRequest,
  ProductRequestStatus,
} from '../interfaces/productRequest.interface';
import style from '../scss/Roadmap.module.scss';

const colors = ['blue', 'orange', 'rebeccapurple', 'teal', 'yellow', 'violet'];

type RoadMapItem = [status: ProductRequestStatus, count: number, color: string];

function mapRoadmap(productRequests: ProductRequest[]): RoadMapItem[] {
  const roadMapItems = Object.entries(countBy(productRequests, 'status'));
  const usedColors = colors.slice(0, roadMapItems.length);
  return zipWith(roadMapItems, usedColors, ([status, value], color) => {
    return [status || 'unset', value || 0, color || 'red'] as RoadMapItem;
  });
}

interface RoadmapProps {
  productRequests: ProductRequest[];
}

function Roadmap({ productRequests }: RoadmapProps) {
  return (
    <Card className={style.roadmap}>
      <div className={style.header}>
        <h2>Roadmap</h2>
        <a>View</a>
      </div>
      {mapRoadmap(productRequests).map(([status, value, color]) => (
        <div key={status} className={style.item}>
          <Circle height="8px" color={color} className={style.dot} />
          <span className={style.status}>{formatKeyString(status)}</span>
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
