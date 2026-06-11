import type { StatCardType } from "../../types/common.types";

type StatCardProps = {
  item: StatCardType;
};

const StatCard = ({ item }: StatCardProps) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold text-gray-500">{item.title}</p>
      <h3 className="mt-3 text-4xl font-black text-gray-900">{item.value}</h3>
      <p className="mt-2 text-sm text-gray-500">{item.subText}</p>
    </div>
  );
};

export default StatCard;