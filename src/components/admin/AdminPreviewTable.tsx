type AdminPreviewTableColumn<TItem> = {
  key: string;
  header: string;
  render: (item: TItem) => React.ReactNode;
};

type AdminPreviewTableProps<TItem> = {
  caption: string;
  columns: Array<AdminPreviewTableColumn<TItem>>;
  rows: TItem[];
};

export function AdminPreviewTable<TItem>({
  caption,
  columns,
  rows,
}: AdminPreviewTableProps<TItem>) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.24)] backdrop-blur-sm">
      <div className="border-b border-white/10 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">{caption}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-white/4 text-slate-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-xs font-medium uppercase tracking-[0.22em]"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-white/6 text-slate-200"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 align-top">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
