import { forwardRef } from "react";
const Choose = forwardRef(({ title, defValue, options }, ref) => {
  return (
    <label className="flex flex-col gap-3">
      <span className="w-[150px]">{title}</span>
      <select ref={ref} className="rounded p-2 shadow">
        <option value="">{defValue}</option>
        {options.map((e) => {
          const val = title.includes("Category") ? e.id : e.value;
          return (
            <option key={e.id} value={val}>
              {e.name}
            </option>
          );
        })}
      </select>
    </label>
  );
});

export default Choose;
